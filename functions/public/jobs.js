const {db} = require("../db");
const functions = require("firebase-functions");
const tools = require("../tools");

exports.sendApply = async (req, res) => {
  if (req.method == 'OPTIONS') {
    return res.end();
  }
  const docId = await performInsert(req.body);
  console.info(`Added document with id ${docId}`);
  return res.status(201).json('');
}

async function sendApplyMailAdmin(applicationId, applyForm) {
  return await db
    .collection('mail_ext')
    .doc(applicationId + '-jobs-apply')
    .set({
      from: process.env.APP_MAIL_FROM,
      to: process.env.APP_MAIL_FROM,
      replyTo: applyForm.volunteer.email,
      template: {
        name: `jobs-apply-admin`,
        data: applyForm,
      }
    });
}

async function sendApplyMailVolunteer(applicationId, applyForm) {
  return await db
    .collection('mail_ext')
    .doc(applicationId + '-jobs-apply-volunteer')
    .set({
      from: process.env.APP_MAIL_FROM,
      to: applyForm.volunteer.email,
      replyTo: process.env.APP_MAIL_FROM,
      template: {
        name: `jobs-apply-volunteer-` + applyForm.volunteer.siteLang,
        data: applyForm,
      }
    });
}

async function performInsert(data) {
  const writeResult = await db
    .collection('applications')
    .add({
      ...data,
      insertTimestamp: new Date(),
      campYear: tools.campYear(),
    });
  console.info(`Added document with id ${writeResult.id}`);
  return writeResult.id;
}

exports.jobsSendApplyMails = functions
  .runWith(tools.defaultHttpOptions)
  .region('europe-west1')
  .firestore
  .document('applications/{docId}')
  .onCreate((change, context) => {
    return sendApplyMailVolunteer(context.params.docId, change.data())
      .then(() => {
        sendApplyMailAdmin(context.params.docId, change.data());
      });
  });