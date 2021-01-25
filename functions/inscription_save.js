const tools = require('./tools');
const functions = require('firebase-functions');
const {admin, db} = require('./db');

const cors = require('cors')({
  origin: true,
});

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
        console.log(validation.error);
        return res.status(400).send({
          message: 'firstNameParent and lastNameParent are mandatory, email should be a valid e-mail address.',
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
        return res.send(stripTechnicalFields(doc.data()));
      } else {
        return res.status(404).send({
          message: `Document with ${docId} not found`,
          data: doc,
        });
      }
    });

exports.inscriptionSaveMailCreatedInscription = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('inscription_temporary/{docId}')
    .onCreate((change, context) => {
      return db
          .collection('inscription_temporary_mails_to_send')
          .doc(context.params.docId)
          .set({
            firstNameParent: change.data().firstNameParent,
            lastNameParent: change.data().lastNameParent,
            email: change.data().email,
            temporaryInscriptionId: context.params.docId,
            campYear: change.data().campYear,
            mailScheduled: false,
            insertTimestamp: new Date(),
          });
    });

exports.inscriptionSaveMailUpdatedInscription = functions
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
            firstNameParent: change.after.data().firstNameParent,
            lastNameParent: change.after.data().lastNameParent,
            email: change.after.data().email,
            mailScheduled: false,
            updateTimestamp: new Date(),
          }, {
            merge: true,
          });
    });

exports.inscriptionSaveScheduleMail = functions
    .runWith(tools.defaultBatchOptions)
    .region('europe-west1')
    .pubsub.schedule('*/10 16-22 * * *')
    .timeZone('Europe/Brussels')
    .onRun(async (context) => {
      console.info(`Fetching unsent mails for camp year ${tools.campYear()}`);
      const mailsToSend = await db.collection('inscription_temporary_mails_to_send')
          .where('campYear', '==', tools.campYear())
          .where('mailScheduled', '==', false)
          .limit(20)
          .get();
      let count = 0;
      let errorCount = 0;
      mailsToSend.forEach(async (mailRequest) => {
        try {
          count += 1;
          await db.collection('mail_ext')
              .add({
                from: 'Loppem test <vzwtaalstagescv@gmail.com>',
                // replyTo:
                to: mailRequest.data().email,
                template: {
                  name: 'inscription-temporary-mail-edit-link', // TODO: make it language dependent ?
                  data: mailRequest.data(),
                },
              }).then(() => {
                db.collection('inscription_temporary_mails_to_send')
                    .doc(mailRequest.id)
                    .set({
                      mailScheduled: true,
                      mailScheduledLastTimestamp: new Date(),
                    }, {
                      merge: true,
                    });
              });
        } catch (err) {
          errorCount += 1;
          console.error('Could not prepare to send message', mailRequest.data(), err);
          db.collection('inscription_temporary_mails_to_send')
              .doc(mailRequest.id)
              .set({
                mailScheduled: true, // don't let it loop
                mailError: err.message,
                mailScheduledLastTimestamp: new Date(),
              }, {
                merge: true,
              });
        }
      });
      console.info(`Finished proccessing ${count} requests with ${errorCount} errors`);
      return null;
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
    yearsSchool: joi.number().min(0),
    hoursSchool: joi.number().min(0),
    immersionSchool: joi.boolean(),
    reportSchool: joi.string().trim().allow(''),
    apportedStudent: joi.boolean(),
    contact: joi.string().trim().allow(''),
    additionalInfo: joi.string().trim().allow(''),
    foodInfo: joi.string().trim().allow(''),
    interest: joi.string().trim().allow(''),
    acceptPictures: joi.boolean(),
    acceptTerms: joi.boolean().allow(true),
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

/**
 * Removes the technical fields when sending data back to the front-end
 * @return {*} the document without timestamps
 */
function stripTechnicalFields(data) {
  const strippedData = {...data};
  delete strippedData.insertTimestamp;
  delete strippedData.updateTimestamp;
  return strippedData;
}
