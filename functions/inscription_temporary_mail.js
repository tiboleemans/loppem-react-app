const tools = require('./tools')
const functions = require('firebase-functions')
const { admin, db } = require('./db')


const deploy_options = {
  maxInstances: 1,
  timeoutSeconds: 60,
  memory: functions.VALID_MEMORY_OPTIONS['128MB'],
  ingressSettings: functions.INGRESS_SETTINGS_OPTIONS['ALLOW_INTERNAL_ONLY'],
}


exports.inscriptionTemporaryMail = functions
  .runWith(tools.default_batch_options)
  .region('europe-west-1')
  .pubsub.schedule('every 15 minutes').onRun((context) => {
    console.log('This will be run every 15 minutes!');
    return null;
  });
