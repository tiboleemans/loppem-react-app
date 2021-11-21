const data = require('./test_data.js');
const supertest = require('supertest');
const should = require('should');
const testutils = require('./testutils.js');
const {admin, db} = require('../db');

// This agent refers to PORT where program is runninng.

const server = supertest.agent('http://localhost:5001/loppem-adf69/europe-west1');

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
});
