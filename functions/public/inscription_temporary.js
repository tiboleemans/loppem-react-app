// =================================================================================
// Student temporary inscription
// This class is responsible for CRU interaction with the inscription_temporary,
// containing the students which aren't permanently inscribed into the system (yet).
// This might trigger actions defined in the inscription_temporary_mails_to_send.js.
// =================================================================================
const tools = require('../tools');
const functions = require('firebase-functions');
const {admin, db} = require('../db');

const cors = require('cors')({
  origin: true,
});

/**
 * REST: temporarily inscribe a student into the system
 * Method: POST
 * Request Parameters:
 *  - id (optional, if present it will update an existing record)
 */
exports.inscriptionSaveTemporary = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .https.onRequest(async (req, res) => {
      if (req.method !== 'POST') {
        return res.status(400).send({
          message: 'Method not supported',
        });
      }

      validation = preValidate(req.body);

      if (validation.error != null) {
        console.log(validation.error.details);
        return res.status(400).send({
          validation,
        });
      }

      let docId = req.query.id;
      const insert = docId == null;
      console.log(`Request temporary save with id ${docId} for parent ${validation.value.firstNameParent} ${validation.value.lastNameParent}`);

      if (insert) {
        docId = await performInsert(validation.value);
      } else {
        await performUpdate(docId, validation.value);
      }

      return cors(req, res, () => {
        res.status(insert ? 201 : 200).send({
          id: docId,
        });
      });
    });

/**
 * REST: fetch a temporarily saved student
 * Method: GET
 * Request Parameters:
 *  - id
 */
exports.inscriptionSaveGetTempInscription = functions
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

      const doc = await db.collection('inscription_temporary')
          .doc(docId).get();
      if (doc.exists) {
        return res.send(tools.stripTechnicalFields(doc.data()));
      } else {
        return res.status(404).send({
          message: `Document with ${docId} not found`,
          data: doc,
        });
      }
    });


/**
 * Insert a new record in the table inscription_temporary.
 * Returns the document ID
 * @param {*} data the request body (student data)
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
 * @param {string} docId
 * @param {*} data student data
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
 * @param {*} data student data
 * @return {boolean} true if contact information is correct
 */
function preValidate(data) {
  const joi = tools.saferJoi;
  const schema = joi.object({
    language: joi.string().trim().allow(''),
    period: joi.string().trim().allow(''),
    firstNameStudent: joi.string().trim().allow(''),
    lastNameStudent: joi.string().trim().allow(''),
    gender: joi.string().trim().allow(''),
    birthday: joi.string().trim().allow(''),
    firstNameParent: joi.string().trim().min(3).required(),
    lastNameParent: joi.string().trim().min(3).required(),
    email: joi.string().trim().email().required(),
    relation: joi.string().trim().allow(''),
    street: joi.string().trim().allow(''),
    houseNr: joi.string().trim().allow(''),
    busNr: joi.string().trim().allow(''),
    city: joi.string().trim().allow(''),
    zipCode: joi.string().trim().allow(''),
    gsm: joi.string().trim().allow(''),
    gsm2: joi.string().trim().allow(''),
    nameSchool: joi.string().trim().allow(''),
    streetSchool: joi.string().trim().allow(''),
    houseNrSchool: joi.string().trim().allow(''),
    busNrSchool: joi.string().trim().allow(''),
    citySchool: joi.string().trim().allow(''),
    zipSchool: joi.string().trim().allow(''),
    titleProfSchool: joi.string().trim().allow(''),
    nameProfSchool: joi.string().trim().allow(''),
    yearsSchool: joi.string().trim().allow(''),
    hoursSchool: joi.string().trim().allow(''),
    immersionSchool: joi.boolean().allow(null),
    reportSchool: joi.boolean().allow(null),
    apportedStudent: joi.string().trim().allow(''),
    contact: joi.string().trim().allow(''),
    additionalInfo: joi.string().trim().allow(''),
    foodInfo: joi.string().trim().allow(''),
    interest: joi.string().trim().allow(''),
    acceptPictures: joi.boolean().allow(null),
    acceptTerms: joi.boolean().allow(null),
  });

  return schema.validate(data, {
    presence: 'required', // don't save an empty object
    convert: true, // perform trim and XSS sanitizations
    abortEarly: true, // temporary save is very lax
    allowUnknown: false, // do not allow unknonw fields
    errors: {
      escapeHtml: true, // espace the original data in error messages
    },
  });
}
