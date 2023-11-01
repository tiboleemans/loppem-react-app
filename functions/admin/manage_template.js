// =================================================================================
// Template management
// This class is responsible for inserting a template into the Firebase store.
// See mail_templates/README.md for more info.
// =================================================================================
const {admin, db} = require('../db');

exports.updateTemplate = async (req, res) => {
  if (req.method == 'OPTIONS') {
    return res.end();
  }

  if (req.query.id == null || req.query.id == '') {
    return res.status(400).send({
      message: 'The request parameter id is mandatory',
    });
  }

  if (req.body.html == null || req.body.html == '') {
    return res.status(400).send({
      message: 'The bodyActiveTab should contain an html bodyActiveTab',
    });
  }

  if (req.body.subject == null || req.body.subject == '') {
    return res.status(400).send({
      message: 'The bodyActiveTab should contain a subject',
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

  return res.status(200).send({
    id: docId,
  });
};
