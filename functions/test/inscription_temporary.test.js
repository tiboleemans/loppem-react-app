const data = require('./test_data.js');
const supertest = require('supertest');
const should = require('should');

// This agent refers to PORT where program is runninng.

const server = supertest.agent(`${process.env.APP_TEST_BASE_URL}${process.env.APP_TEST_PUBLIC_API_PREFIX}`);

describe('Temporary inscription', function() {
  describe('Happy flow', function() {
    it('Should temporarily save the sample student', function(done) {
      server
          .post('/inscriptionSaveTemporary')
          .send(data.validTemporaryStudent)
          .expect(201)
          .expect('Content-type', /json/)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.id);
            done();
          });
    });

    it('Should temporarily save the sample student and return correct data', function(done) {
      server
          .post('/inscriptionSaveTemporary')
          .send(data.validTemporaryStudent)
          .expect('Content-type', /json/)
          .expect(201)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.id);
            const docId = res.body.id;
            server
                .get(`/inscriptionSaveGetTempInscription?id=${docId}`)
                .expect('Content-type', /json/)
                .expect(200)
                .end(function(err, res) {
                  if (err) return done(err);

                  should.exist(res.body.firstNameParent);
                  const student = res.body;
                  student.language.should.equal('english');
                  student.additionalInfo.should.equals('&lt;script&gt;alert(\'test\')&lt;/script&gt;');
                  done();
                });
          });
    });

    it('Should update the temporary sample student and return correct data', function(done) {
      server
          .post('/inscriptionSaveTemporary')
          .send(data.validTemporaryStudent)
          .expect('Content-type', /json/)
          .expect(201)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.id);
            const docId = res.body.id;
            const updatedStudent = {...data.validStudent};
            updatedStudent.interest = 'Ruby';

            server
                .post(`/inscriptionSaveTemporary?id=${docId}`)
                .send(updatedStudent)
                .expect('Content-type', /json/)
                .expect(200)
                .end(function(err, res) {
                  if (err) return done(err);

                  server
                      .get(`/inscriptionSaveGetTempInscription?id=${docId}`)
                      .expect('Content-type', /json/)
                      .expect(200)
                      .end(function(err, res) {
                        if (err) return done(err);

                        should.exist(res.body.firstNameParent);
                        const student = res.body;
                        student.language.should.equal('english');
                        student.additionalInfo.should.equals('&lt;script&gt;alert(\'test\')&lt;/script&gt;');
                        done();
                      });
                });
          });
    });
  });

  describe('Unhappy flow', function() {
    it('Should return 400 if invalid data is passed', function(done) {
      const invalidStudent = {...data.validStudent};
      invalidStudent.email = 'This-is-not-an-email';
      server
          .post('/inscriptionSaveTemporary')
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

    it('Should return 400 if no docId is passed', function(done) {
      server
          .get('/inscriptionSaveGetTempInscription')
          .expect('Content-type', /json/)
          .expect(400)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.message);
            res.body.message.should.equal('id is a mandatory parameter');
            done();
          });
    });

    it('Should return 404 if an unknown id is passed', function(done) {
      server
          .get('/inscriptionSaveGetTempInscription?id=iets-random')
          .expect('Content-type', /json/)
          .expect(404)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.message);
            res.body.message.should.equal('Document with iets-random not found');
            done();
          });
    });

    it('Should return 404 if not using GET', function(done) {
      server
          .post('/inscriptionSaveGetTempInscription?id=iets-random')
          .expect(404)
          .end(function(err, res) {
            if (err) return done(err);

            done();
          });
    });

    it('Should handle preflight checks', function(done) {
      server
          .options('/inscriptionSaveGetTempInscription?id=iets-random')
          .expect('access-control-allow-methods', /GET/)
          .expect(204)
          .end(function(err, res) {
            if (err) return done(err);

            done();
          });
    });
  });
});
