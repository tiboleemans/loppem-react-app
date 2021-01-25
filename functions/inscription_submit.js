const tools = require('./tools');
const functions = require('firebase-functions');
const {admin, db} = require('./db');

const cors = require('cors')({
  origin: true,
});


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

exports.addPaymentAndConfirm = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .https.onRequest(async (req, res) => {
      if (req.method !== 'POST') {
        return res.status(400).send({
          message: 'Method not supported',
        });
      }


      validation = validatePayment(req.body);
      if (validation.error) {
        console.log(validation.error);
        return res.status(400).send(
            validation,
        );
      }

      await updatePayment(validation.value);

      return cors(req, res, () => {
        res.status(200).send({ });
      });
    });

exports.createInitialPayment = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('inscription/{docId}')
    .onCreate((change, context) => {
      return db
          .collection('payment')
          .doc(context.params.docId)
          .set({
            firstNameParent: change.data().firstNameParent,
            lastNameParent: change.data().lastNameParent,
            firstNameStudent: change.data().firstNameStudent,
            lastNameStudent: change.data().lastNameStudent,
            period: change.data().period,
            language: change.data().language,
            email: change.data().email,
            campYear: change.data().campYear,
            paidAmount: 0.00,
            insertTimestamp: new Date(),
          });
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
            firstNameStudent: change.data().firstNameStudent,
            lastNameStudent: change.data().lastNameStudent,
            period: change.data().period,
            language: change.data().language,
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
            firstNameStudent: change.data().firstNameStudent,
            lastNameStudent: change.data().lastNameStudent,
            period: change.data().period,
            language: change.data().language,
            campYear: change.data().campYear,
            additionalInfo: change.data().additionalInfo,
            insertTimestamp: new Date(),
          });
    });

exports.confirmStudentAfterPayment = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('payment/{docId}')
    .onUpdate((change, context) => {
      if (!change.after.data().paymentComplete || change.before.data().paymentComplete) {
        console.info(`Confirmation for ${context.params.docId} became ${change.after.data().paymentComplete}, was ${change.before.data().paymentComplete}`);
        return true;
      }

      const data = change.after.data();
      const defaultClass = data.campYear + '_' + data.period + '_' + data.language + '_default';
      console.log(`Confirming studentId ${context.params.docId} into default class ${defaultClass}`);
      db
          .collection('class')
          .doc(defaultClass)
          .set({ // TODO: maybe not overwrite this every time ?
            campYear: data.campYear,
            period: data.period,
            language: data.language,
          });
      return db
          .collection('class')
          .doc(defaultClass)
          .collection('class_assignment')
          .doc(context.params.docId)
          .set({
            student: db.collection('inscription').doc(context.params.docId),
            firstNameStudent: data.firstNameStudent,
            lastNameStudent: data.lastNameStudent,
            insertTimestamp: new Date(),
          });
    });

/**
 * Insert a new record in the table inscription.
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
 * Updates an existing payment record
 * @param {*} data
 */
async function updatePayment(data) {
  await db
      .collection('payment')
      .doc(data.studentId)
      .set({
        paidAmount: data.paymentAmount,
        paymentDate: data.paymentDate,
        paymentComplete: data.paymentComplete,
        updateTimestamp: new Date(),
      }, {
        merge: true,
      },
      );
  console.info(`Updated payment with id ${data.studentId}`);
  return data.studentId;
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
    gsm: joi.string().trim().min(12).required(),
    gsm2: joi.string().trim().allow(''),
    nameSchool: joi.string().trim().min(3).required(),
    streetSchool: joi.string().trim().min(3).required(),
    houseNrSchool: joi.string().trim().min(1).max(5).required(),
    busNrSchool: joi.string().trim().max(10).allow(''),
    citySchool: joi.string().trim().min(2).required(),
    zipSchool: joi.string().trim().min(4).required(),
    titleProfSchool: joi.string().trim().min(2).required(),
    nameProfSchool: joi.string().trim().min(3).required(),
    yearsSchool: joi.number().min(0).required(),
    hoursSchool: joi.number().min(0).required(),
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

/**
 * Validates and sanitizes input
 * @param {*} data
 * @return {*} validation data
 */
function validatePayment(data) {
  const joi = tools.saferJoi;
  const schema = joi.object({
    studentId: joi.string().min(5).required(),
    paymentAmount: joi.number().min(1).required(),
    paymentDate: joi.string().min(10).required(),
    paymentComplete: joi.boolean().required(),
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
