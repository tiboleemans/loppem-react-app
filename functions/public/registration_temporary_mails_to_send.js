// =================================================================================
// Sending temporary emails
// This class is responsible for sending e-mail after a student was temporarily
// inscribed. The mail will be sent immediately after saving, but it will only
// send the e-mail at most once per day.
// The system relies on the installed mail sender plugin in firebase.
// inscription_temporary_mails_to_send:
// - campYear
// - email
// - firstNameParent
// - insertTimestamp
// - lastNameParent
// - mailScheduled  <= this field indicates if we've prepared the data for the extention.
// - temporaryInscriptionId <= this is (another) reference to the temporary student.
// =================================================================================
const tools = require('../tools');
const functions = require('firebase-functions');
const {admin, db} = require('../db');

/**
 * Firestore#onCreate: after first temporary inscription, send e-mail
 */
exports.inscriptionSaveMailAfterInscription = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('registration/{docId}')
    .onCreate((change, context) => {
      return db
          .collection('inscription_temporary_mails_to_send')
          .doc(context.params.docId)
          .set({
            firstName: change.data().parent.firstName,
            lastName: change.data().parent.firstName,
            email: change.data().parent.email,
            temporaryInscriptionId: context.params.docId,
            campYear: change.data().campYear,
            mailScheduled: false,
            insertTimestamp: new Date(),
          });
    });

/**
 * Firestore#onUpdate: after updating temporary inscription, send e-mail
 */
exports.inscriptionSaveMailAfterUpdate = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('inscription_temporary/{docId}')
    .onUpdate((change, context) => {
      if (change.after.data().status != 'TEMPORARY') {
        return "not-temporary";
      }
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
            firstName: change.after.data().parent.firstName,
            lastName: change.after.data().parent.lastName,
            email: change.after.data().parent.email,
            mailScheduled: false,
            updateTimestamp: new Date(),
          }, {
            merge: true,
          });
    });

/**
 * Firestore#onWrite: convert our mail data to the format of the mail sender plugin
 */
exports.inscriptionSaveConvertEmailForExt = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('inscription_temporary_mails_to_send/{docId}')
    .onWrite((change, context) => { // this is also delete ... but we don't do those by default
      console.info(`Converting mail for request ${context.params.docId}`);
      return prepareSendEmail(change);
    });

/**
 * PubSub: send mails if it previously failed
 */
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

/**
 * Converts the temporary student data and store it into the mail extention table (which will perform the actual sending of the e-mail).
 * @param {*} mailRequest the firebase document
 * @return {null} nothing
 */
async function prepareSendEmail(mailRequest) {
  try {
    mailData = null;
    id = null;
    if (mailRequest.data) {
      mailData = mailRequest.data();
      id = mailRequest.id;
    } else if (!mailRequest.before.data() && mailRequest.after.data()) {
      mailData = mailRequest.after.data();
      id = mailRequest.after.id;
    } else if (mailRequest.before.data().mailScheduled === true && mailRequest.after.data().mailScheduled === false && mailRequest.after.data().mailError != '') {
      mailData = mailRequest.after.data();
      id = mailRequest.after.id;
    } else {
      return; // do not process updates
    }

    await db.collection('mail_ext')
        .add({
          from: process.env.APP_MAIL_FROM,
          // replyTo:
          to: mailData.email,
          template: {
            name: 'inscription-temporary-mail-edit-link', // TODO: make it language dependent ?
            data: mailData,
          },
        }).then(() => {
          db.collection('inscription_temporary_mails_to_send')
              .doc(id)
              .set({
                mailScheduled: true,
                mailScheduledLastTimestamp: new Date(),
                mailError: '',
              }, {
                merge: true,
              });
        });
  } catch (err) {
    console.error('Could not prepare to send message', mailRequest.after.id, err);
    db.collection('inscription_temporary_mails_to_send')
        .doc(mailRequest.id)
        .set({
          mailScheduled: false, // If it failed to schedule, let it be picked up again next day
          mailError: err.message,
          mailScheduledLastTimestamp: new Date(),
        }, {
          merge: true,
        });
  }
}
