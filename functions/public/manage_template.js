// =================================================================================
// Template management
// This class is responsible for inserting a template into the Firebase store.
// See mail_templates/README.md for more info.
// =================================================================================
const tools = require('../tools');
const functions = require('firebase-functions');
const {admin, db} = require('../db');

const cors = require('cors')({
  origin: true,
});

exports.updateTemplate = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .https.onRequest(async (req, res) => {
      if (req.method !== 'POST') {
        return res.status(400).send({
          message: 'Method not supported',
        });
      }

      if (req.query.id == null || req.query.id == '') {
        return res.status(400).send({
          message: 'The reuest parameter id is mandatory',
        });
      }

      if (req.body.html == null || req.body.html == '') {
        return res.status(400).send({
          message: 'The body should contain an html body',
        });
      }

      if (req.body.subject == null || req.body.subject == '') {
        return res.status(400).send({
          message: 'The body should contain a subject',
        });
      }

      const docId = req.query.id;
      const writeResult = await db
          .collection('mail_templates')
          .doc(docId)
          .set({
            subject: req.body.subject,
            html: req.body.html,
          });
      console.info(`Added template with id ${writeResult.id} and body ${req.rawBody.toString()}`);

      return cors(req, res, () => {
        res.status(200).send({
          id: docId,
        });
      });
    });
