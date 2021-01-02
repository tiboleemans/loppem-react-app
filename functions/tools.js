const functions = require('firebase-functions')

exports.camp_year = function camp_year() {
  return 2021;
}

exports.default_http_options = {
  maxInstances: 25,
  timeoutSeconds: 15,
  memory: functions.VALID_MEMORY_OPTIONS['128MB'],
  ingressSettings: functions.INGRESS_SETTINGS_OPTIONS['ALLOW_INTERNAL_ONLY'],
}

exports.default_batch_options = {
  maxInstances: 2,
  timeoutSeconds: 120,
  memory: functions.VALID_MEMORY_OPTIONS['128MB'],
  ingressSettings: functions.INGRESS_SETTINGS_OPTIONS['ALLOW_INTERNAL_ONLY'],
}
