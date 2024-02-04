const {db} = require("../db");
const functions = require("firebase-functions");
const tools = require("../tools");

exports.sendCodeMail = async (req, res) => {
  if (req.method == 'OPTIONS') {
    return res.end();
  }
  const docId = await performInsert(req.body);
  console.info(`Added document with id ${docId}`);
  return res.status(201).json('');
}

async function performInsert(request) {
  const writeResult = await db
    .collection('mail_ext')
    .add({
      from: process.env.APP_MAIL_FROM,
      to: request.friend.email,
      bcc: process.env.APP_MAIL_FROM,
      replyTo: process.env.APP_MAIL_FROM,
      template: {
        name: `code-` + request.friend.language,
        data: request,
      }
    });
  return writeResult.id;
}