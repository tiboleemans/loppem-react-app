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
 * Firestore#onCreate: after inscription, send e-mail confirmation mail to parents and to admin
 */
exports.inscriptionSaveMailAfterSubmit = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('inscription/{docId}')
    .onCreate((change, context) => {
      return prepareSendEmailToParent(context.params.docId, change.data())
          .then(() => {
            prepareSendEmailToAdmin(context.params.docId, change.data());
          });
    });

/**
 * Converts the student data and store it into the mail extention table (which will perform the actual sending of the e-mail).
 * @param {*} studentId the documentID of the student, will be used as part of the mail_ext documentId
 * @param {*} student the firebase document of the inscription table
 * @return {null} nothing
 */
async function prepareSendEmailToParent(studentId, student) {
  try {
    return await db.collection('mail_ext')
        .doc(studentId + '-inscription-confirmation')
        .set({
          from: process.env.APP_MAIL_FROM,
          // replyTo:
          to: student.email,
          template: {
            name: `inscription-confirmation-${student.sitelanguage}`,
            data: student,
          },
        });
  } catch (err) {
    console.error('Could not prepare to send message', studentId, err);
  }
}


/**
 * Converts the student data and store it into the mail extention table (which will perform the actual sending of the e-mail).
 * @param {*} studentId the documentID of the student, will be used as part of the mail_ext documentId
 * @param {*} student the firebase document of the inscription table
 * @return {null} nothing
 */
async function prepareSendEmailToAdmin(studentId, student) {
  try {
    return await db.collection('mail_ext')
        .doc(studentId + '-inscription-cc')
        .set({
          from: process.env.APP_MAIL_FROM,
          // replyTo:
          to: process.env.APP_MAIL_ADMIN_EMAIL,
          template: {
            name: `inscription-cc`,
            data: student,
          },
        });
  } catch (err) {
    console.error('Could not prepare to send message', studentId, err);
  }
}
