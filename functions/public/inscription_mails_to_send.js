// =================================================================================
// Sending emails after inscription
// This class is responsible for sending e-mail after a student was permanently
// inscribed. The mail will be sent immediately after submitting.
// The system relies on the installed mail sender plugin in firebase.
// =================================================================================
const tools = require('../tools');
const functions = require('firebase-functions');
const {admin, db} = require('../db');

/**
 * Firestore#onCreate: after first temporary inscription, send e-mail
 */
exports.inscriptionSaveMailAfterSubmit = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('inscription/{docId}')
    .onCreate((change, context) => {
      prepareSendEmailToParent(change.data())
          .then(() => {
            prepareSendEmailToAdmin(change.data());
          });
    });

/**
 * Converts the student data and store it into the mail extention table (which will perform the actual sending of the e-mail).
 * @param {*} student the firebase document
 * @return {null} nothing
 */
async function prepareSendEmailToParent(student) {
  try {
    return await db.collection('mail_ext')
        .add({
          from: 'Loppem Conversa <info@loppemconversa.be>',
          // replyTo:
          to: student.email,
          template: {
            name: `inscription-confirmation-${student.sitelanguage}`,
            data: student,
          },
        });
  } catch (err) {
    console.error('Could not prepare to send message', student.id, err);
  }
}


/**
 * Converts the student data and store it into the mail extention table (which will perform the actual sending of the e-mail).
 * @param {*} student the firebase document
 * @return {null} nothing
 */
 async function prepareSendEmailToAdmin(student) {
  try {
    return await db.collection('mail_ext')
        .add({
          from: 'Loppem Conversa <info@loppemconversa.be>',
          // replyTo:
          to: 'wutske@gmail.com',
          template: {
            name: `inscription-cc`,
            data: student,
          },
        });
  } catch (err) {
    console.error('Could not prepare to send message', student.id, err);
  }
}
