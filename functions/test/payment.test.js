const data = require('./test_data.js');
const supertest = require('supertest');
const should = require('should');

// This agent refers to PORT where program is runninng.

const server = supertest.agent('http://localhost:5001/loppem-adf69/europe-west1/api');
const adminServer = supertest.agent('http://localhost:5001/loppem-adf69/europe-west1/admin/api');

describe('Payment', function() {
  describe('Add a payment', function() {
    it('Should update a student\'s payment data to a final payment', function(done) {
      server
          .post('/inscriptionSubmit')
          .send(data.validStudent)
          .expect('Content-type', /json/)
          .expect(201)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.id);
            const docId = res.body.id;

            adminServer
                .post('/addPaymentAndConfirm')
                .send({
                  ...data.validPayment,
                  studentId: docId,
                })
                .expect(200)
                .expect('Content-type', /json/)
                .end(function(err, res) {
                  if (err) return done(err);

                  should.exist(res.body.message);
                  res.body.message.should.equal('ok');
                  done();
                });
          });
    });
  });
});
