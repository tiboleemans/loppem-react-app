const functions = require('firebase-functions');

exports.campYear = function campYear() {
  return 2021;  // Could become a function, like once we're passed august it can become next year ?
};

exports.defaultHttpOptions = {
  maxInstances: 25,
  timeoutSeconds: 15,
  memory: '128MB',
  ingressSettings: 'ALLOW_INTERNAL_ONLY',
};

exports.defaultBatchOptions = {
  maxInstances: 2,
  timeoutSeconds: 120,
  memory: '128MB',
  ingressSettings: 'ALLOW_INTERNAL_ONLY',
};
