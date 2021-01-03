const tools = require('./tools');
const functions = require('firebase-functions');
const {admin, db} = require('./db');

const cors = require('cors')({
  origin: true,
});


// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript 🤷‍♂️
const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

exports.inscriptionSaveTemporary = functions
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
            firstName: change.data().firstNameParent,
            lastName: change.data().lastNameParent,
            email: change.data().email,
            temporaryInscriptionId: context.params.docId,
            campYear: change.data().campYear,
            mailSent: false,
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
            firstName: change.after.data().firstNameParent,
            lastName: change.after.data().lastNameParent,
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
    .pubsub.schedule('0/10 16-22 * * *').onRun(async (context) => {
      console.info(`Fetching unsent mails for camp year ${tools.campYear()}`);
      const mailsToSend = await db.collection('inscription_temporary_mails_to_send')
          .where('campYear', '==', tools.campYear())
          .where('mailScheduled', '==', false)
          .limit(100)
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
  let valid = true;
  valid &= data.firstNameParent !== '';
  valid &= data.lastNameParent !== '';
  valid &= re.test(data.email);
  return valid;
}
