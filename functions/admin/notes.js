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
 * REST: fetch notes for a particular student.
 * Method: GET
 * Request Parameters:
 *  - id
 *  - type: 'cook' or 'nurse'
 */
exports.adminGetStudentNotes = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .https.onRequest((req, res) => {
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

      const type = req.query.type;
      if (type == null) {
        return res.status(400).send({
          message: 'type is a mandatory parameter',
        });
      }

      return new Promise((resolve, reject) => {
        db.collection(getTableName(type))
            .doc(docId)
            .get()
            .then(async (doc) => {
              if (doc.exists) {
                await tools.fetchStudent(doc.data())
                    .then((student) => {
                      resolve(cors(req, res, () => {
                        res.send(tools.stripTechnicalFields(student));
                      }));
                    });
              } else {
                resolve(cors(req, res, () => {
                  res.status(404).send({
                    message: `Document with ${docId} not found`,
                    data: doc,
                  });
                }));
              }
            });
      });
    });

/**
 * REST: List notes.
 * Method: GET
 * Request Parameters:
 *  - type: 'cook' or 'nurse'
 *  - campyear: mandatory (int)
 *  - period: mandatory (string)
 */
exports.adminListStudentNotes = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .https.onRequest((req, res) => {
      if (req.method !== 'GET') {
        return res.status(400).send({
          message: 'Method not supported',
        });
      }

      const campYear = req.query.campyear;
      if (campYear == null) {
        return res.status(400).send({
          message: 'campyear is a mandatory parameter',
        });
      }

      const period = req.query.period;
      if (period == null) {
        return res.status(400).send({
          message: 'period is a mandatory parameter',
        });
      }

      const type = req.query.type;
      if (type == null) {
        return res.status(400).send({
          message: 'type is a mandatory parameter',
        });
      }
      const resultList = [];
      return new Promise((resolve, reject) => {
        db.collection(getTableName(type))
            .where('campYear', '==', parseInt(campYear))
            .where('period', '==', period)
            .get()
            .then(async (querySnapshot) => {
              for (i = 0; i < querySnapshot.size; ++i) {
                const doc = querySnapshot.docs[i];
                await tools.fetchStudent(doc.data()).then((noteWithStudent) => {
                  resultList.push(tools.stripTechnicalFields(noteWithStudent));
                });
              }
              if (resultList.length > 0) {
                resolve(cors(req, res, () => {
                  res.send(resultList);
                }));
              } else {
                resolve(cors(req, res, () => {
                  res.status(404).send({
                    message: `No results`,
                  });
                }));
              }
            });
      });
    });

exports.createNotesCook = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('student/{docId}')
    .onCreate((change, context) => {
      return db
          .collection('notes_cook')
          .doc(context.params.docId)
          .set({
            student: change.ref,
            campYear: change.data().campYear,
            period: change.data().period,
            foodInfo: change.data().foodInfo,
            insertTimestamp: new Date(),
          });
    });

exports.createNotesNurse = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('student/{docId}')
    .onCreate((change, context) => {
      return db
          .collection('notes_nurse')
          .doc(context.params.docId)
          .set({
            student: change.ref,
            campYear: change.data().campYear,
            period: change.data().period,
            additionalInfo: change.data().additionalInfo,
            insertTimestamp: new Date(),
          });
    });

/**
 * Gets the table name for either cook or nurse notes.
 * @param {string} type
 * @return {string} a document table name.
 */
function getTableName(type) {
  if (type === 'cook') {
    return 'notes_cook';
  } else if (type === 'nurse') {
    return 'notes_nurse';
  } else {
    return null;
  }
}
