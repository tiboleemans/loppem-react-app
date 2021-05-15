// https://bigcodenerd.org/split-cloud-functions-firebase/
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

module.exports = {
  admin,
  db,
};
