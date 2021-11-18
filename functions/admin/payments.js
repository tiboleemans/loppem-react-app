// =================================================================================
// Payment data management
// This class is responsible for handling data in the payment table
// =================================================================================
const tools = require('../tools');
const functions = require('firebase-functions');
const {admin, db} = require('../db');

const cors = require('cors')({
  origin: true,
});

exports.addPaymentAndConfirm = functions
    .runWith(tools.defaultInternalHttpOptions)
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
        res.status(200).send({
          'message': 'ok',
        });
      });
    });

exports.createInitialPayment = functions
    .runWith(tools.defaultInternalHttpOptions)
    .region('europe-west1')
    .firestore
    .document('inscription/{docId}')
    .onCreate((change, context) => {
      return db
          .collection('payment')
          .doc(context.params.docId)
          .set({
            inscription: change.ref,
            insertTimestamp: new Date(),
          });
    });


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
