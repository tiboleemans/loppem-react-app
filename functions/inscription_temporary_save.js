const tools = require('./tools');
const functions = require('firebase-functions');
const {admin, db} = require('./db');

const cors = require('cors')({
  origin: true,
});


// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript 🤷‍♂️
const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

exports.inscriptionTemporarySave = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .https.onRequest(async (req, res) => {
      if (req.method !== 'POST') {
        return res.status(400).send({
          message: 'Method not supported',
        });
      }

      if (!preValidate(req.body)) {
        return res.status(400).send({
          message: 'firstNameParent and lastNameParent are mandatory, email should be a valid e-mail address.',
        });
      }

      let docId = req.query.id;
      const insert = docId == null;
      console.log(`Request temporary save with id ${docId} for ${req.body.firstNameStudent} ${req.body.lastNameStudent}`);

      if (insert) {
        docId = await performInsert(req.body);
      } else {
        await performUpdate(docId, req.body);
      }

      return cors(req, res, () => {
        res.status(insert ? 201 : 200).send({
          id: docId,
        });
      });
    });

exports.inscriptionTemporarySaveMailRequest = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('inscription_temporary/{docId}')
    .onCreate((change, context) => {
      return db
          .collection('inscription_temporary_mails_to_send')
          .doc(context.params.docId)
          .set({
            firstName: change.data().firstNameParent,
            lastName: change.data().lastNameParent,
            email: change.data().email,
            temporaryInscriptionId: context.params.docId,
            campYear: change.data().campYear,
            mailSent: false,
            insertTimestamp: new Date(),
          });
    });

exports.inscriptionTemporarySaveMailRequestUpdate = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('inscription_temporary/{docId}')
    .onUpdate((change, context) => {
      console.info(change.before.data());
      return db
          .collection('inscription_temporary_mails_to_send')
          .doc(context.params.docId)
          .set({
            firstName: change.after.data().firstNameParent,
            lastName: change.after.data().lastNameParent,
            email: change.after.data().email,
            mailSent: false,
            updateTimestamp: new Date(),
          }, {
            merge: true,
          });
    });

/**
 * Insert a new record in the table inscription_temporary.
 * Returns the document ID
 * @param {*} data the request body
 */
async function performInsert(data) {
  const writeResult = await db
      .collection('inscription_temporary')
      .add({
        ...data,
        insertTimestamp: new Date(),
        campYear: tools.campYear(),
      });
  console.info(`Added document with id ${writeResult.id}`);
  return writeResult.id;
}

/**
 * Updates an existing document, merges the data (e.g. missing fields will not be removed)
 * @param {*} docId
 * @param {*} data
 */
async function performUpdate(docId, data) {
  await db
      .collection('inscription_temporary')
      .doc(docId)
      .set({
        ...data,
        updateTimestamp: new Date(),
      }, {
        merge: true,
      },
      );
  console.info(`Updated document with id ${docId}`);
}

/**
 * Contact information of parents is required, otherwise we can't contact them
 * @param {*} data
 * @return {boolean} true if contact information is correct
 */
function preValidate(data) {
  let valid = true;
  valid &= data.firstNameParent !== '';
  valid &= data.lastNameParent !== '';
  valid &= re.test(data.email);
  return valid;
}
