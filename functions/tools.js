const functions = require('firebase-functions');

exports.campYear = function campYear() {
  return 2021;
};

exports.defaultHttpOptions = {
  maxInstances: 25,
  timeoutSeconds: 15,
  memory: functions.VALID_MEMORY_OPTIONS['128MB'],
  ingressSettings: functions.INGRESS_SETTINGS_OPTIONS['ALLOW_INTERNAL_ONLY'],
};

exports.defaultBatchOptions = {
  maxInstances: 2,
  timeoutSeconds: 120,
  memory: functions.VALID_MEMORY_OPTIONS['128MB'],
  ingressSettings: functions.INGRESS_SETTINGS_OPTIONS['ALLOW_INTERNAL_ONLY'],
};
