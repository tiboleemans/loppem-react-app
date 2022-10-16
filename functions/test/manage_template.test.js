const supertest = require('supertest');
const should = require('should');
const {admin, db} = require('../db');

// This agent refers to PORT where program is runninng.

const adminServer = supertest.agent('http://localhost:5001/loppem-adf69/europe-west1/admin/api');

describe('Mail templates', function() {
  describe('Add a mail template', function() {
    it('Should write the mail template in the database', function(done) {
      adminServer
          .post('/updateTemplate?id=test-me-nl')
          .send({
            html: 'This is html, just believe me',
            subject: 'Hello world',
          })
          .expect('Content-type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.id);

            db.collection('mail_templates')
                .doc(res.body.id)
                .get()
                .then((template) => {
                  template.data().html.should.equal('This is html, just believe me');
                  template.data().subject.should.equal('Hello world');
                  done();
                }).catch((error) => {
                  console.log(error);
                  done(error);
                });
          });
    });
  });
});
