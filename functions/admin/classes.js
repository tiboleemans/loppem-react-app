// =================================================================================
// Management of classes data.
// =================================================================================
const tools = require('../tools');
const functions = require('firebase-functions');
const {admin, db} = require('../db');

const cors = require('cors')({
  origin: true,
});

exports.addNewStudentToDefaultClass = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('student/{docId}')
    .onCreate(async (change, context) => {
      const data = change.data();
      const defaultClass = data.campYear + '_' + data.period + '_' + data.language + '_default';
      console.log(`Confirming studentId ${context.params.docId} into default class ${defaultClass}`);
      db
          .collection('class')
          .doc(defaultClass)
          .set({ // TODO: maybe not overwrite this every time ?
            campYear: data.campYear,
            period: data.period,
            language: data.language,
          });
      return db
          .collection('class')
          .doc(defaultClass)
          .collection('class_assignment')
          .doc(context.params.docId)
          .set({
            student: data,
            insertTimestamp: new Date(),
          });
    });
