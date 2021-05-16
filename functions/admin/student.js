// =================================================================================
// Management of student data.
// As soon as a student is confirmed, we copy the data from the inscription table
// to the student table so that we can work with a filtered
// =================================================================================
const tools = require('../tools');
const functions = require('firebase-functions');
const {admin, db} = require('../db');

const cors = require('cors')({
  origin: true,
});

exports.createStudentAfterPayment = functions
    .runWith(tools.defaultHttpOptions)
    .region('europe-west1')
    .firestore
    .document('payment/{docId}')
    .onUpdate(async (change, context) => {
      if (!change.after.data().paymentComplete || change.before.data().paymentComplete) {
        console.info(`Confirmation for ${context.params.docId} became ${change.after.data().paymentComplete}, was ${change.before.data().paymentComplete}`);
        return true;
      }

      const data = change.after.data();
      const student = await data.inscription.get();
      console.log(`Creating studentId ${context.params.docId}`);
      return db
          .collection('student')
          .doc(context.params.docId)
          .set({ // TODO: maybe not overwrite this every time ?
            ...student.data(),
            insertTimestamp: new Date(),
          });
    });
