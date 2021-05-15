const data = require('./test_data.js');
const supertest = require('supertest');
const should = require('should');

// This agent refers to PORT where program is runninng.

const server = supertest.agent('http://localhost:5001/loppem-adf69/europe-west1');

describe('Final inscription', function() {
  describe('Happy flow', function() {
    it('Should permanently save the sample student', function(done) {
      server
          .post('/inscriptionSubmit')
          .send(data.validStudent)
          .expect('Content-type', /json/)
          .expect(201)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.id);
            done();
          });
    });
  });
});
