const {db} = require("../db");
const functions = require("firebase-functions");
const tools = require("../tools");

exports.sendInterestMail = async (req, res) => {
  if (req.method == 'OPTIONS') {
    return res.end();
  }
  const docId = await performInsert(req.body);
  console.info(`Added document with id ${docId}`);
  return res.status(201).json('');
}

async function performInsert(interest) {
  const writeResult = await db
    .collection('mail_ext')
    .add({
      from: process.env.APP_MAIL_FROM,
      to: interest.friend.email,
      cc: interest.parent.email,
      bcc: process.env.APP_MAIL_FROM,
      replyTo: interest.parent.email,
      template: {
        name: `interest-` + interest.parent.language,
        data: interest,
      }
    });
  return writeResult.id;
}