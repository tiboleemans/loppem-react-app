// =================================================================================
// Student inscription
// This class is responsible for permanently inscribing a student into the system.
// Actions triggered by this creation are stored in the 'admin' section.
// =================================================================================

const tools = require('../tools');
const functions = require('firebase-functions');
const {admin, db} = require('../db');

const cors = require('cors')({
  origin: true,
});

/**
 * REST: Permanently inscribes the student in the system.
 * This does not mean the student will be assigned to a class,
 * this only happens after confirmation of the full payment.
 * Method: POST
 */
exports.inscriptionSubmit = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .https.onRequest(async (req, res) => {
      if (req.method !== 'POST') {
        return res.status(400).send({
          message: 'Method not supported',
        });
      }

      validation = validate(req.body);
      if (validation.error) {
        console.log(validation.error);
        return res.status(400).send(
            validation,
        );
      }

      const docId = await performInsert(validation.value);

      return cors(req, res, () => {
        res.status(201).send({
          id: docId,
        });
      });
    });

/**
 * Insert a new student record in the table 'inscription'.
 * Returns the document ID
 * @param {*} data the request body
 */
async function performInsert(data) {
  const writeResult = await db
      .collection('inscription')
      .add({
        ...data,
        insertTimestamp: new Date(),
        campYear: tools.campYear(),
      });
  console.info(`Added document with id ${writeResult.id}`);
  return writeResult.id;
}

/**
 * Validates and sanitizes input
 * @param {*} data
 * @return {*} validation data
 */
function validate(data) {
  const joi = tools.saferJoi;
  const schema = joi.object({
    language: joi.string().trim().min(1).required(),
    period: joi.string().trim().min(4).required(),
    firstNameStudent: joi.string().trim().min(2).required(),
    lastNameStudent: joi.string().trim().min(2).required(),
    gender: joi.string().trim().min(3).required(),
    birthday: joi.string().trim().min(10).max(10).required(), // TODO: add regex or use date
    firstNameParent: joi.string().trim().min(3).required(),
    lastNameParent: joi.string().trim().min(3).required(),
    email: joi.string().trim().email().required(),
    relation: joi.string().trim(),
    street: joi.string().trim().min(2).required(),
    houseNr: joi.string().trim().min(1).max(5).required(),
    busNr: joi.string().trim().max(10).allow(''),
    city: joi.string().trim().min(2).required(),
    zipCode: joi.string().trim().min(4).required(),
    gsm: joi.string().trim().min(10).required(),
    gsm2: joi.string().trim().allow(''),
    nameSchool: joi.string().trim().min(3).required(),
    streetSchool: joi.string().trim().min(3).required(),
    houseNrSchool: joi.string().trim().min(1).max(5).required(),
    busNrSchool: joi.string().trim().max(10).allow(''),
    citySchool: joi.string().trim().min(2).required(),
    zipSchool: joi.string().trim().min(4).required(),
    titleProfSchool: joi.string().trim().min(2).required(),
    nameProfSchool: joi.string().trim().min(3).required(),
    yearsSchool: joi.string().trim().required(),
    hoursSchool: joi.string().trim().required(),
    immersionSchool: joi.boolean(),
    reportSchool: joi.string().trim().allow(''),
    apportedStudent: joi.boolean(),
    contact: joi.string().trim().min(3).required(),
    additionalInfo: joi.string().trim().allow(''),
    foodInfo: joi.string().trim().allow(''),
    interest: joi.string().trim().allow(''),
    acceptPictures: joi.boolean(),
    acceptTerms: joi.boolean().allow(true),
  });

  return schema.validate(data, {
    presence: 'required', // don't save an empty object
    convert: true, // perform trim and XSS sanitizations
    abortEarly: false, // validate all fields instead of stopping at the first error
    allowUnknown: false, // do not allow unknonw fields
    errors: {
      escapeHtml: true, // espace the original data in error messages
    },
  });
}
