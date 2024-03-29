const data = require('./test_data.js');
const supertest = require('supertest');
const should = require('should');
const {admin, db} = require('../db');
const testutils = require('./testutils.js');

// This agent refers to PORT where program is runninng.

const server = supertest.agent(`${process.env.APP_TEST_BASE_URL}${process.env.APP_TEST_PUBLIC_API_PREFIX}/registration`);

describe('Temporary registration', function() {
  describe('Happy flow', function() {
    it('Should temporarily save the sample student', function(done) {
      server
          .post('/temporary')
          .send(data.validTemporaryStudent())
          .expect(201)
          .expect('Content-type', /json/)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.id);
            should.exist(res.body.student.firstNameStudent);
            should.exist(res.body.status);
            res.body.status.should.equals('TEMPORARY');
            res.body.student.firstNameStudent.should.equal('Joske');
            done();
          });
    });

    it('Should create an email to the parents', async function() {
      const res = await server
          .post('/temporary')
          .send(data.validTemporaryStudent())
          .expect(201)
          .expect('Content-type', /json/);
      should.exist(res.body.id);
      let mailToParents = await db.collection('inscription_temporary_mails_to_send')
        .doc(res.body.id)
        .get();

      attemptsLeft = 10;
      while (attemptsLeft-- > 0 && !mailToParents.exists) {
        await testutils.sleep(1000);
        mailToParents = await db.collection('inscription_temporary_mails_to_send')
          .doc(res.body.id)
          .get();
        if (mailToParents.exists) {
          break;
        }
      }

      mailToParents.exists.should.be.true();
      mailToParents.data().email.should.equal(data.validStudent().parent.email);
    });

    it('Should temporarily save the sample student and return correct data', function(done) {
      server
          .post('/temporary')
          .send(data.validTemporaryStudent())
          .expect('Content-type', /json/)
          .expect(201)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.id);
            const docId = res.body.id;
            server
                .get(`/${docId}`)
                .expect('Content-type', /json/)
                .expect(200)
                .end(function(err, res) {
                  if (err) return done(err);

                  should.exist(res.body.id);
                  res.body.id.should.equal(docId);
                  should.exist(res.body.parent);
                  should.exist(res.body.parent.firstNameParent);
                  should.exist(res.body.student);
                  should.exist(res.body.extra);
                  should.exist(res.body.status);
                  res.body.status.should.equals('TEMPORARY');
                  const student = res.body.student;
                  student.language.should.equal('english');
                  const extra = res.body.extra;
                  extra.additionalInfo.should.equals('&lt;script&gt;alert(\'test\')&lt;/script&gt;');
                  done();
                });
          });
    });

    it('Should update the temporary sample student and return correct data', function(done) {
      server
          .post('/temporary')
          .send(data.validTemporaryStudent())
          .expect('Content-type', /json/)
          .expect(201)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.id);
            const docId = res.body.id;
            const updatedStudent = {...data.validTemporaryStudent(), id: docId};
            updatedStudent.extra.interest = 'Ruby';

            server
                .put(`/temporary`)
                .send(updatedStudent)
                .expect('Content-type', /json/)
                .expect(200)
                .end(function(err, res) {
                  if (err) return done(err);

                  server
                      .get(`/${docId}`)
                      .expect('Content-type', /json/)
                      .expect(200)
                      .end(function(err, res) {
                        if (err) return done(err);

                        should.exist(res.body.id);
                        res.body.id.should.equal(docId);
                        should.exist(res.body.parent.firstNameParent);
                        should.exist(res.body.status);
                        res.body.status.should.equals('TEMPORARY');
                        const student = res.body.student;
                        student.language.should.equal('english');
                        const extra = res.body.extra;
                        extra.additionalInfo.should.equals('&lt;script&gt;alert(\'test\')&lt;/script&gt;');
                        done();
                      });
                });
          });
    });
  });

  describe('Validation failures', function() {
    it('Should return 400 if invalid data is passed', function(done) {
      const invalidStudent = {...data.validTemporaryStudent()};
      invalidStudent.parent.email = 'This-is-not-an-email';
      server
          .post('/temporary')
          .send(invalidStudent)
          .expect('Content-type', /json/)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.error);
            const error = res.body.error;
            error.details.should.be.Array();
            error.details.should.have.length(1);
            done();
          });
    });

    it('Should return a 400 if updating without an id', function(done) {
      server
          .put('/temporary')
          .send(data.validTemporaryStudent())
          .expect(400)
          .expect('Content-type', /json/)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.message);
            res.body.message.should.equal('id is mandatory when updating a registration');
            done();
          });
    })

    it('Should return a 400 when trying to create a new registration with an id', function(done) {
      server
          .post('/temporary')
          .send({...data.validTemporaryStudent(), id: 'something'})
          .expect(400)
          .expect('Content-type', /json/)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.message);
            res.body.message.should.equal('id is not allowed when creating a registration');
            done();
          });
    })

    it('Should return a 404 when trying to update a non-existing registration', function(done) {
      server
          .put('/temporary')
          .send({...data.validTemporaryStudent(), id: 'something'})
          .expect(404)
          .expect('Content-type', /json/)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.message);
            res.body.message.should.equal('the registration with id something was not found');
            done();
          });
    })
  })

  describe('Status changing', function() {
    it('Should not be possible to set status on a temporary registration', function(done) {
      server
          .post('/temporary')
          .send({...data.validTemporaryStudent(), status: 'PAID'})
          .expect(201)
          .expect('Content-type', /json/)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.status);
            res.body.status.should.equal('TEMPORARY');
            done();
          });
    });

    it('Should not be possible to update the temporary status', function(done) {
      server
          .post('/temporary')
          .send(data.validTemporaryStudent())
          .expect('Content-type', /json/)
          .expect(201)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.id);
            const docId = res.body.id;
            const updatedStudent = {...data.validTemporaryStudent(), id: docId, status: 'FINAL'};
            updatedStudent.extra.interest = 'Ruby';

            server
                .put(`/temporary`)
                .send(updatedStudent)
                .expect('Content-type', /json/)
                .expect(200)
                .end(function(err, res) {
                  if (err) return done(err);

                  should.exist(res.body.status);
                  res.body.status.should.equal('TEMPORARY');
                  done();
                });
          });
    });
  })

  it('Should handle preflight checks', function(done) {
    server
        .options('/temporary')
        .expect('access-control-allow-methods', /GET/)
        .expect(204)
        .end(function(err, res) {
          if (err) return done(err);

          done();
        });
  });

});

describe('Fetching registration', function() {
  it('Should return 404 if an unknown id is passed', function(done) {
    server
        .get('/iets-random')
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
        .post('/iets-random')
        .expect(404)
        .end(function(err, res) {
          if (err) return done(err);

          done();
        });
  });

  it('Should handle preflight checks', function(done) {
    server
        .options('/iets-random')
        .expect('access-control-allow-methods', /GET/)
        .expect(204)
        .end(function(err, res) {
          if (err) return done(err);

          done();
        });
  });
});

describe('Final registration', function() {
  describe('Happy flow', function() {
    it('Should save the sample student', function(done) {
      server
          .post('/')
          .send(data.validStudent())
          .expect(201)
          .expect('Content-type', /json/)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.id);
            should.exist(res.body.student.firstNameStudent);
            should.exist(res.body.status);
            res.body.status.should.equals('FINAL');
            res.body.student.firstNameStudent.should.equal('Joske');
            done();
          });
    });

    it('Should create an email to the parents', async function() {
      const res = await server
          .post('/')
          .send(data.validStudent())
          .expect(201)
          .expect('Content-type', /json/);
      should.exist(res.body.id);
      let mailToParents = await db.collection('mail_ext')
        .doc(res.body.id + '-inscription-confirmation')
        .get();

      attemptsLeft = 10;
      while (attemptsLeft-- > 0 && !mailToParents.exists) {
        await testutils.sleep(1000);
        mailToParents = await db.collection('mail_ext')
            .doc(res.body.id + '-inscription-confirmation')
            .get();
        if (mailToParents.exists) {
          break;
        }
      }

      mailToParents.exists.should.be.true();
      mailToParents.data().to.should.equal(data.validStudent().parent.email);
    });

    it('Should be possible to finalize a temporary registration', function(done) {
      server
      .post('/temporary')
      .send(data.validTemporaryStudent())
      .expect('Content-type', /json/)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);

        should.exist(res.body.id);
        const docId = res.body.id;
        server
          .post('/')
          .send({...data.validStudent(), id: docId})
          .expect(200)
          .expect('Content-type', /json/)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.id);
            should.exist(res.body.student.firstNameStudent);
            should.exist(res.body.status);
            res.body.status.should.equals('FINAL');
            res.body.student.firstNameStudent.should.equal('Joske');
            done();
          });
      });

    });

    it('Should save the sample student and return correct data', function(done) {
      server
          .post('/')
          .send(data.validStudent())
          .expect('Content-type', /json/)
          .expect(201)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.id);
            const docId = res.body.id;
            server
                .get(`/${docId}`)
                .expect('Content-type', /json/)
                .expect(200)
                .end(function(err, res) {
                  if (err) return done(err);

                  should.exist(res.body.id);
                  res.body.id.should.equal(docId);
                  should.exist(res.body.parent);
                  should.exist(res.body.parent.firstNameParent);
                  should.exist(res.body.student);
                  should.exist(res.body.extra);
                  should.exist(res.body.status);
                  res.body.status.should.equals('FINAL');
                  const student = res.body.student;
                  student.language.should.equal('english');
                  const extra = res.body.extra;
                  extra.additionalInfo.should.equals('&lt;script&gt;alert(\'test\')&lt;/script&gt;');
                  done();
                });
          });
    });

    // it('Should update the temporary sample student and return correct data', function(done) {
    //   server
    //       .post('/temporary')
    //       .send(data.validTemporaryStudent())
    //       .expect('Content-type', /json/)
    //       .expect(201)
    //       .end(function(err, res) {
    //         if (err) return done(err);

    //         should.exist(res.bodyActiveTab.id);
    //         const docId = res.bodyActiveTab.id;
    //         const updatedStudent = {...data.validTemporaryStudent(), id: docId};
    //         updatedStudent.extra.interest = 'Ruby';

    //         server
    //             .put(`/temporary`)
    //             .send(updatedStudent)
    //             .expect('Content-type', /json/)
    //             .expect(200)
    //             .end(function(err, res) {
    //               if (err) return done(err);

    //               server
    //                   .get(`/${docId}`)
    //                   .expect('Content-type', /json/)
    //                   .expect(200)
    //                   .end(function(err, res) {
    //                     if (err) return done(err);

    //                     should.exist(res.bodyActiveTab.id);
    //                     res.bodyActiveTab.id.should.equal(docId);
    //                     should.exist(res.bodyActiveTab.parent.firstNameParent);
    //                     should.exist(res.bodyActiveTab.status);
    //                     res.bodyActiveTab.status.should.equals('TEMPORARY');
    //                     const student = res.bodyActiveTab.student;
    //                     student.language.should.equal('english');
    //                     const extra = res.bodyActiveTab.extra;
    //                     extra.additionalInfo.should.equals('&lt;script&gt;alert(\'test\')&lt;/script&gt;');
    //                     done();
    //                   });
    //             });
    //       });
    // });
  });

  describe('Validation failures', function() {
    it('Should return 400 if invalid data is passed', function(done) {
      const invalidStudent = {...data.validStudent()};
      invalidStudent.parent.email = 'This-is-not-an-email';
      server
          .post('/')
          .send(invalidStudent)
          .expect('Content-type', /json/)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.error);
            const error = res.body.error;
            error.details.should.be.Array();
            error.details.should.have.length(1);
            done();
          });
    });

    // it('Should return a 400 if updating without an id', function(done) {
    //   server
    //       .put('/temporary')
    //       .send(data.validTemporaryStudent())
    //       .expect(400)
    //       .expect('Content-type', /json/)
    //       .end(function(err, res) {
    //         if (err) return done(err);

    //         should.exist(res.bodyActiveTab.message);
    //         res.bodyActiveTab.message.should.equal('id is mandatory when updating a registration');
    //         done();
    //       });
    // })


    // it('Should return a 404 when trying to update a non-existing registration', function(done) {
    //   server
    //       .put('/temporary')
    //       .send({...data.validTemporaryStudent(), id: 'something'})
    //       .expect(404)
    //       .expect('Content-type', /json/)
    //       .end(function(err, res) {
    //         if (err) return done(err);

    //         should.exist(res.bodyActiveTab.message);
    //         res.bodyActiveTab.message.should.equal('the registration with id something was not found');
    //         done();
    //       });
    // })
  })

  describe('Status changing', function() {
    it('Should not be possible to set status on a final registration', function(done) {
      server
          .post('/')
          .send({...data.validStudent(), status: 'PAID'})
          .expect(201)
          .expect('Content-type', /json/)
          .end(function(err, res) {
            if (err) return done(err);

            should.exist(res.body.status);
            res.body.status.should.equal('FINAL');
            done();
          });
    });

    // it('Should not be possible to update the status', function(done) {
    //   server
    //       .post('/')
    //       .send(data.validStudent())
    //       .expect('Content-type', /json/)
    //       .expect(201)
    //       .end(function(err, res) {
    //         if (err) return done(err);

    //         should.exist(res.bodyActiveTab.id);
    //         const docId = res.bodyActiveTab.id;
    //         const updatedStudent = {...data.validTemporaryStudent(), id: docId, status: 'FINAL'};
    //         updatedStudent.extra.interest = 'Ruby';

    //         server
    //             .put(`/temporary`)
    //             .send(updatedStudent)
    //             .expect('Content-type', /json/)
    //             .expect(200)
    //             .end(function(err, res) {
    //               if (err) return done(err);

    //               should.exist(res.bodyActiveTab.status);
    //               res.bodyActiveTab.status.should.equal('TEMPORARY');
    //               done();
    //             });
    //       });
    // });

    it('Should handle preflight checks', function(done) {
      server
          .options('/')
          .expect('access-control-allow-methods', /GET/)
          .expect(204)
          .end(function(err, res) {
            if (err) return done(err);

            done();
          });
    });

  })

});
