const {db} = require("../db");
const functions = require("firebase-functions");
const tools = require("../tools");

exports.sendInterestMail = async (req, res) => {
  if (req.method == 'OPTIONS') {
    return res.end();
  }
  const docId = await performInsert(req.body);
  return res.status(201).json('');
}

async function performInsert(data) {
  const writeResult = await db
    .collection('mail_ext')
    .add({
      from: process.env.APP_MAIL_FROM,
      replyTo: data.parent.email,
      to: data.friend.email,
      message: {
        subject: data.friend.subject,
        text: data.friend.content,
        html: data.friend.content,
      },
    });
  console.info(`Added document with id ${writeResult.id}`);
  return writeResult.id;
}


async function prepareSendEmailToParent(studentId, registration) {
  try {
    return await db.collection('mail_ext')
      .doc(studentId + '-registration-confirmation')
      .set({
        from: process.env.APP_MAIL_FROM,
        // replyTo:
        to: registration.parent.email,
        template: {
          name: `registration-confirmation-early-` + language,
          data: registration,
        },
      });
  } catch (err) {
    console.error('Could not prepare to send message', studentId, err);
  }
}