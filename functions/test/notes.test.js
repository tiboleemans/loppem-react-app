const data = require('./test_data.js');
const supertest = require('supertest');
const should = require('should');

// This agent refers to PORT where program is runninng.

const server = supertest.agent('http://localhost:5001/loppem-adf69/europe-west1');


let studentId = null;
describe('Notes', function() {
  before(function(done) {
    this.timeout(20000);
    server
        .post('/inscriptionSubmit')
        .send(data.validStudent)
        .expect('Content-type', /json/)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);

          should.exist(res.body.id);
          studentId = res.body.id;
          console.info(`\tStudent=${studentId}`);
          server
              .post('/addPaymentAndConfirm')
              .send({
                ...data.validPayment,
                studentId: studentId,
              })
              .expect('Content-type', /json/)
              .expect(200)
              .end(function(err, res) {
                if (err) return done(err);

                should.exist(res.body.message);
                res.body.message.should.equal('ok');
                new Promise((resolve) => setTimeout(done, 12000))
                    .then(done);
              });
        });
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
            should.exist(res.body.student.birthday);
            should.exist(res.body.student.city);
            done();
          });
    });

    it('Should get all nurse notes', function(done) {
      server
          .get(`/adminListStudentNotes?type=nurse&campyear=2021&period=august`)
          .expect('Content-type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);

            res.body.should.be.instanceof(Array);

            done();
          });
    });
  });

  describe('Cook notes', function() {
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
            should.exist(res.body.student.birthday);
            should.exist(res.body.student.city);
            done();
          });
    });
  });
});
