const tools = require('./tools')
const functions = require('firebase-functions')
const { admin, db } = require('./db')

const cors = require('cors')({
  origin: true,
});


// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript 🤷‍♂️
const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

exports.inscriptionTemporarySave = functions
  .runWith(tools.default_http_options)
  .region('europe-west-1')
  .https.onRequest(async (req, res) => {
    if (req.method != 'POST') {
      return res.status(400).send({
        message: "Method not supported"
      });
    }

    if (!pre_validate(req.body)) {
      return res.status(400).send({
        message: "firstNameParent and lastNameParent are mandatory, email should be a valid e-mail address."
      })
    }

    let doc_id = req.query.id
    let insert = doc_id == null;
    console.log(`Request temporary save with id ${doc_id} for ${req.body.firstNameStudent} ${req.body.lastNameStudent}`)

    if (insert) {
      doc_id = await perform_insert(req.body);
      schedule_send_link(req.body, doc_id)
    } else {
      await perform_update(doc_id, req.body);
    }

    return cors(req, res, () => {
      res.status(insert ? 201 : 200).send({
        id : doc_id
      });
    });
  });

  /**
   * Insert a new record in the table inscription_temporary.
   * Returns the document ID
   * @param {*} data the request body
   */
  async function perform_insert(data) {
    writeResult = await db
      .collection('inscription_temporary')
      .add({
        ...data,
        insertTimestamp: new Date(),
        campYear: tools.camp_year()
      });
    console.info(`Added document with id ${writeResult.id}`)
    return writeResult.id
  }

  /**
   * Add record to the table inscription_temporary_mails_to_send
   * so we can keep track whether we've already sent an e-mail
   * with the edit link or not
   * @param {*} data the request body
   * @param {*} doc_id the document id of the stored 'temporary' data
   */
  async function schedule_send_link(data, doc_id) {
    await db
      .collection('inscription_temporary_mails_to_send')
      .doc(doc_id)
      .set({
        firstName: data.firstNameParent,
        lastName: data.lastNameParent,
        email: data.email,
        temporaryInscriptionId: doc_id,
        campYear: tools.camp_year(),
        mailSent: false,
        insertTimestamp: new Date()
      });
  }

  async function perform_update(doc_id, data) {
    writeResult = await db
      .collection('inscription_temporary')
      .doc(doc_id)
      .set({...data, updateTimestamp: new Date()}, {merge: true});
    console.info(`Updated document with id ${doc_id}`)
  }

  /**
   * Contact information of parents is required, otherwise we can't contact them
   * @param {*} data
   */
  function pre_validate(data) {
    let valid = true;
    valid &= data.firstNameParent != '';
    valid &= data.lastNameParent  != '';
    valid &= re.test(data.email)
    return valid;
  }
