const tools = require('../tools');
const functions = require('firebase-functions');
const {admin, db} = require('../db');

const cors = require('cors')({
  origin: true,
});


exports.inscriptionSaveMailAfterInscription = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('inscription_temporary/{docId}')
    .onCreate((change, context) => {
      return db
          .collection('inscription_temporary_mails_to_send')
          .doc(context.params.docId)
          .set({
            firstNameParent: change.data().firstNameParent,
            lastNameParent: change.data().lastNameParent,
            email: change.data().email,
            temporaryInscriptionId: context.params.docId,
            campYear: change.data().campYear,
            mailScheduled: false,
            insertTimestamp: new Date(),
          });
    });

exports.inscriptionSaveMailAfterUpdate = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('inscription_temporary/{docId}')
    .onUpdate((change, context) => {
      const previousMail = db.collection('inscription_temporary_mails_to_send')
        .doc(context.params.docId).get();
      if (previousMail.exists) {
        if (previousMail.data().mailScheduled === true) {
          const timeDiff = (new Date().getTime() - previousMail.data().updateTimestamp.getTime()) / 1000;
          const oneDay = (60 * 60 * 24);
          console.info(`Time diff is ${timeDiff}`);
          if (timeDiff < oneDay) {
            console.info(`No mail will be sent for id ${context.params.docId} because time diff is only ${timeDiff}s`);
            return;
          }
        }
      }

      return db
          .collection('inscription_temporary_mails_to_send')
          .doc(context.params.docId)
          .set({
            firstNameParent: change.after.data().firstNameParent,
            lastNameParent: change.after.data().lastNameParent,
            email: change.after.data().email,
            mailScheduled: false,
            updateTimestamp: new Date(),
          }, {
            merge: true,
          });
    });

exports.inscriptionSaveConvertEmailForExt = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('inscription_temporary_mails_to_send/{docId}')
    .onWrite((change, context) => { // this is also delete ... but we don't do those by default
      console.info(`Converting mail for request ${context.params.docId}`);
      return prepareSendEmail(change);
    });



exports.inscriptionSaveScheduleMail = functions
    .runWith(tools.defaultBatchOptions)
    .region('europe-west1')
    .pubsub.schedule('0 8 * * *')
    .timeZone('Europe/Brussels')
    .onRun(async (context) => {
      console.info(`Fetching unsent mails for camp year ${tools.campYear()}`);
      const mailsToSend = await db.collection('inscription_temporary_mails_to_send')
          .where('campYear', '==', tools.campYear())
          .where('mailScheduled', '==', false)
          .limit(20)
          .get();
      mailsToSend.forEach(async (mailRequest) => prepareSendEmail(mailRequest));
      console.info(`Finished proccessing ${count} requests with ${errorCount} errors`);
      return null;
    });

async function prepareSendEmail(mailRequest) {
  try {
    mailData = null;
    if (mailRequest.data) {
      mailData = mailRequest.data();
    } else {
      return; // do not process updates
    }

    await db.collection('mail_ext')
        .add({
          from: 'Loppem test <vzwtaalstagescv@gmail.com>',
          // replyTo:
          to: mailData.email,
          template: {
            name: 'inscription-temporary-mail-edit-link', // TODO: make it language dependent ?
            data: mailData,
          },
        }).then(() => {
          db.collection('inscription_temporary_mails_to_send')
              .doc(mailData.id)
              .set({
                mailScheduled: true,
                mailScheduledLastTimestamp: new Date(),
                mailError: '',
              }, {
                merge: true,
              });
        });
  } catch (err) {
    console.error('Could not prepare to send message', mailData, err);
    db.collection('inscription_temporary_mails_to_send')
        .doc(mailData.id)
        .set({
          mailScheduled: false, // If it failed to schedule, let it be picked up again next day
          mailError: err.message,
          mailScheduledLastTimestamp: new Date(),
        }, {
          merge: true,
        });
  }
}
