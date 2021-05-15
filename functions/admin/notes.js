const tools = require('../tools');
const functions = require('firebase-functions');
const {admin, db} = require('../db');

const cors = require('cors')({
  origin: true,
});

exports.createNotesCook = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('inscription/{docId}')
    .onCreate((change, context) => {
      return db
          .collection('notes_cook')
          .doc(context.params.docId)
          .set({
            firstNameStudent: change.data().firstNameStudent,
            lastNameStudent: change.data().lastNameStudent,
            period: change.data().period,
            language: change.data().language,
            campYear: change.data().campYear,
            foodInfo: change.data().foodInfo,
            insertTimestamp: new Date(),
          });
    });

exports.createNotesNurse = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('inscription/{docId}')
    .onCreate((change, context) => {
      return db
          .collection('notes_nurse')
          .doc(context.params.docId)
          .set({
            firstNameStudent: change.data().firstNameStudent,
            lastNameStudent: change.data().lastNameStudent,
            period: change.data().period,
            language: change.data().language,
            campYear: change.data().campYear,
            additionalInfo: change.data().additionalInfo,
            insertTimestamp: new Date(),
          });
    });
