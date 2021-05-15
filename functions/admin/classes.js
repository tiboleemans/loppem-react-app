const tools = require('../tools');
const functions = require('firebase-functions');
const {admin, db} = require('../db');

const cors = require('cors')({
  origin: true,
});








exports.confirmStudentAfterPayment = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('payment/{docId}')
    .onUpdate((change, context) => {
      if (!change.after.data().paymentComplete || change.before.data().paymentComplete) {
        console.info(`Confirmation for ${context.params.docId} became ${change.after.data().paymentComplete}, was ${change.before.data().paymentComplete}`);
        return true;
      }

      const data = change.after.data();
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
            student: db.collection('inscription').doc(context.params.docId),
            firstNameStudent: data.firstNameStudent,
            lastNameStudent: data.lastNameStudent,
            insertTimestamp: new Date(),
          });
    });
