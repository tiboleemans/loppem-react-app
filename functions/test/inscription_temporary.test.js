const data = require('./test_data.js');
const supertest = require('supertest');
const should = require('should');

// This agent refers to PORT where program is runninng.

const server = supertest.agent('http://localhost:5001/loppem-adf69/europe-west1');

describe('Temporary inscription', function() {
  describe('Happy flow', function() {
    it('Should temporarily save the sample student', function(done) {
      server
          .post('/inscriptionSaveTemporary')
          .send(data.validTemporaryStudent)
          .expect('Content-type', /json/)
          .expect(201)
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

    it('Should return 400 if not using GET', function(done) {
      server
          .post('/inscriptionSaveGetTempInscription?id=iets-random')
          .expect('Content-type', /json/)
          .expect(400)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.message);
            res.body.message.should.equal('Method not supported');
            done();
          });
    });
  });
});
