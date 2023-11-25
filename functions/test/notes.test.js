const data = require('./test_data.js');
const supertest = require('supertest');
const should = require('should');
const tools = require('../tools.js');
const testutils = require('./testutils.js');
const {admin, db} = require('../db');


// This agent refers to PORT where program is runninng.

const server = supertest.agent('http://localhost:5001/loppem-adf69/europe-west1');


let studentId = null;
describe.skip('Notes functionality', function() {
  before(async function() {
    const res = await server
        .post('/inscriptionSubmit')
        .send(data.validStudent)
        .expect('Content-type', /json/)
        .expect(201);
    should.exist(res.body.id);
    studentId = res.body.id;
    console.info(`\tStudent=${studentId}`);

    let initialPayment = await db.collection('payment')
        .doc(res.body.id)
        .get();

    attemptsLeft = 10;
    while (attemptsLeft-- > 0 && !initialPayment.exists) {
      await testutils.sleep(500);
      initialPayment = await db.collection('payment')
          .doc(res.body.id)
          .get();
    }
    initialPayment.exists.should.be.true();
    const payres = await server
        .post('/addPaymentAndConfirm')
        .send({
          ...data.validPayment,
          studentId: studentId,
        })
        .expect('Content-type', /json/)
        .expect(200);

    should.exist(payres.body.message);
    payres.body.message.should.equal('ok');
    await testutils.sleep(4000);  // TODO: find a better way to wait for the creation of both notes ?
  });

  describe('Nurse notes', function() {
    it('Should retreive the nurse notes of a single student', function(done) {
      server
          .get(`/adminGetStudentNotes?id=${studentId}&type=nurse`)
          .expect('Content-type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.campYear);
            should.exist(res.body.additionalInfo);
            should.exist(res.body.student);
            should.exist(res.body.student.birthdate);
            should.exist(res.body.student.city);
            done();
          });
    });

    it('Should get all nurse notes', function(done) {
      server
          .get(`/adminListStudentNotes?type=nurse&campyear=${tools.campYear()}&period=august`)
          .expect('Content-type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);

            res.body.should.be.instanceof(Array);

            done();
          });
    });
  });

  describe.skip('Cook notes', function() {
    it('It should retreive the cook\'s notes of a single student', function(done) {
      server
          .get(`/adminGetStudentNotes?id=${studentId}&type=cook`)
          .expect('Content-type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.campYear);
            should.exist(res.body.foodInfo);
            should.exist(res.body.student);
            should.exist(res.body.student.birthdate);
            should.exist(res.body.student.city);
            done();
          });
    });
  });
});
