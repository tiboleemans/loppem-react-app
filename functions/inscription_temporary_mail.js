const tools = require('./tools');
const functions = require('firebase-functions');
const { admin, db } = require('./db');

exports.inscriptionTemporaryMail = functions
    .runWith(tools.defaultBatchOptions)
    .region('europe-west1')
    .pubsub.schedule('0 * * * *').onRun(async (context) => {
      console.info(`Fetching unsent mails for camp year ${tools.campYear()}`);
      const mailsToSend = await db.collection('inscription_temporary_mails_to_send')
          .where('campYear', '==', tools.campYear())
          .where('mailSent', '==', false)
          .limit(100)
          .get();
      let count = 0;
      let errorCount = 0;
      mailsToSend.forEach(async (mailRequest) => {
        try {
          count += 1;
          await db.collection('mail_ext')
              .add({
                from: 'Loppem test <vzwtaalstagescv@gmail.com>',
                // replyTo:
                to: mailRequest.data().email,
                template: {
                  name: 'inscription-temporary-mail-edit-link', // TODO: make it language dependent ?
                  data: mailRequest.data(),
                },
              }).then(() => {
                db.collection('inscription_temporary_mails_to_send')
                    .doc(mailRequest.id)
                    .set({
                      mailSent: true,
                      mailSentLastTimestamp: new Date(),
                    }, {
                      merge: true,
                    });
              });
        } catch (err) {
          errorCount += 1;
          console.error('Could not prepare to send message', mailRequest.data(), err);
          db.collection('inscription_temporary_mails_to_send')
              .doc(mailRequest.id)
              .set({
                mailSent: true, // don't let it loop
                mailError: err.message,
                mailSentLastTimestamp: new Date(),
              }, {
                merge: true,
              });
        }
      });
      console.info(`Finished proccessing ${count} requests with ${errorCount} errors`);
      return null;
    });
