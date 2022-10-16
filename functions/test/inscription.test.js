const data = require('./test_data.js');
const supertest = require('supertest');
const should = require('should');
const testutils = require('./testutils.js');
const {admin, db} = require('../db');

// This agent refers to PORT where program is runninng.

const server = supertest.agent('http://localhost:5001/loppem-adf69/europe-west1/api');

describe('Final inscription', function() {
  describe('Happy flow', function() {
    it('Should permanently save the sample student', async function() {
      const res = await server
          .post('/inscriptionSubmit')
          .send(data.validStudent)
          .expect('Content-type', /json/)
          .expect(201);
      should.exist(res.body.id);

      let mailToParents = await db.collection('mail_ext')
          .doc(res.body.id + '-inscription-confirmation')
          .get();

      attemptsLeft = 10;
      while (attemptsLeft-- > 0 && !mailToParents.exists) {
        await testutils.sleep(500);
        mailToParents = await db.collection('mail_ext')
            .doc(res.body.id + '-inscription-confirmation')
            .get();
      }

      mailToParents.exists.should.be.true();
      mailToParents.data().to.should.equal(data.validStudent.email);
    });
  });

  describe('Unhappy flow', function() {
    it('Should return 400 if invalid data is passed', function(done) {
      const invalidStudent = {...data.validStudent};
      invalidStudent.email = 'This-is-not-an-email';
      server
          .post('/inscriptionSubmit')
          .send(invalidStudent)
          .expect('Content-type', /json/)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.error);
            const error = res.body.error;
            error.details.should.be.Array();
            error.details.should.have.length(1);
            error.details[0].path[0].should.equal('email');
            done();
          });
    });

    it('Should return 404 if not using POST', function(done) {
      server
          .put('/inscriptionSubmit')
          .expect(404)
          .end(function(err, res) {
            if (err) return done(err);

            done();
          });
    });

    it('Should handle preflight checks', function(done) {
      server
          .options('/inscriptionSubmit')
          .expect('access-control-allow-methods', /GET/)
          .expect(204)
          .end(function(err, res) {
            if (err) return done(err);

            done();
          });
    });
  });
});
