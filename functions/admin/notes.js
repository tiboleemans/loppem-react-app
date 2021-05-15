// =================================================================================
// Management of cook's and nurse's notes.
// =================================================================================
const tools = require('../tools');
const functions = require('firebase-functions');
const {admin, db} = require('../db');

const cors = require('cors')({
  origin: true,
});

/**
 * REST: fetch cook's notes
 */
exports.adminGetNotesCook = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .https.onRequest(async (req, res) => {
      if (req.method !== 'GET') {
        return res.status(400).send({
          message: 'Method not supported',
        });
      }

      const docId = req.query.id;
      if (docId == null) {
        return res.status(400).send({
          message: 'id is a mandatory parameter',
        });
      }

      const doc = await db.collection('notes_cook')
          .doc(docId).get();
      if (doc.exists) {
        const body = await fetchStudent(doc.data());
        return cors(req, res, () => {
          res.send(stripTechnicalFields(body));
        });
      } else {
        return cors(req, res, () => {
          res.status(404).send({
            message: `Document with ${docId} not found`,
            data: doc,
          });
        });
      }
    });


/**
 * REST: fetch nurse's notes
 */
exports.adminGetNotesNurse = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .https.onRequest(async (req, res) => {
      if (req.method !== 'GET') {
        return res.status(400).send({
          message: 'Method not supported',
        });
      }

      const docId = req.query.id;
      if (docId == null) {
        return res.status(400).send({
          message: 'id is a mandatory parameter',
        });
      }

      const doc = await db.collection('notes_nurse')
          .doc(docId).get();
      if (doc.exists) {
        const body = await fetchStudent(doc.data());
        return cors(req, res, () => {
          res.send(stripTechnicalFields(body));
        });
      } else {
        return cors(req, res, () => {
          res.status(404).send({
            message: `Document with ${docId} not found`,
            data: doc,
          });
        });
      }
    });

exports.createNotesCook = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('inscription/{docId}')
    .onCreate((change, context) => {
      return db
          .collection('notes_cook')
          .doc(context.params.docId)
          .set({
            student: db.collection('inscription').doc(context.params.docId),
            campYear: change.data().campYear,
            foodInfo: change.data().foodInfo,
            insertTimestamp: new Date(),
          });
    });

exports.createNotesNurse = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('inscription/{docId}')
    .onCreate((change, context) => {
      return db
          .collection('notes_nurse')
          .doc(context.params.docId)
          .set({
            student: db.collection('inscription').doc(context.params.docId),
            campYear: change.data().campYear,
            additionalInfo: change.data().additionalInfo,
            insertTimestamp: new Date(),
          });
    });


/**
 * Removes the technical fields when sending data back to the front-end
 * @param {*} data student data
 * @return {*} the document without timestamps
 */
function stripTechnicalFields(data) {
  const strippedData = {...data};
  delete strippedData.insertTimestamp;
  delete strippedData.updateTimestamp;
  return strippedData;
}

/**
 * Resolves the student data
 * @param {*} data the data from the notes table
 * @return {*} the document with actual student data instead of the firestore doc
 */
async function fetchStudent(data) {
  const studentData = {...data};
  delete studentData.student;
  const student = await data.student.get();
  studentData.student = stripTechnicalFields(student.data());
  return studentData;
}
