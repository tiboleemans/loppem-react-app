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

      const docId = req.query.id;
      const writeResult = await db
          .collection('mail_templates')
          .doc(docId)
          .set({
            subject: 'Bevestiging wachtlijst Loppem Conversa',
            html: req.rawBody.toString(),
          });
      console.info(`Added template with id ${writeResult.id} and body ${req.rawBody.toString()}`);

      return cors(req, res, () => {
        res.status(201).send({
          id: docId,
        });
      });
    });
