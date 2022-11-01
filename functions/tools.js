const xss = require('xss');
const Joi = require('joi');
const crypto = require('crypto');

exports.CORS_GET = {
  origin: true,
  methods: ['GET'],
  preflightContinue: false
}

exports.CORS_POST = {
  origin: true,
  methods: ['POST'],
  preflightContinue: false
}


exports.campYear = function campYear() {
  return parseInt(process.env.APP_CAMP_YEAR); // Could become a function, like once we're passed august it can become next year ?
};

exports.defaultHttpOptions = {
  maxInstances: 25,
  timeoutSeconds: 15,
  memory: '128MB',
  ingressSettings: 'ALLOW_ALL',
};

exports.defaultInternalHttpOptions = {
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

exports.saferJoi = Joi.extend((joi) => {
  return {
    type: 'string',
    base: joi.string(),
    messages: {},
    coerce(value, helpers) {
      return {value: xss(value)};
    },
    rules: {
      sanitize: {
        method(schema) {
          return this.$_setFlag('sanitize', this.$_compile(schema));
        },
      },
    },
  };
});

/**
 * Removes the technical fields when sending data back to the front-end
 * @param {*} data student data
 * @return {*} the document without timestamps
 */
exports.stripTechnicalFields = function stripTechnicalFields(data) {
  const strippedData = {...data};
  delete strippedData.insertTimestamp;
  delete strippedData.updateTimestamp;
  delete strippedData.campYear;
  return strippedData;
};

/**
 * Resolves the student data
 * @param {*} data the data from the notes table
 * @return {*} the document with actual student data instead of the firestore doc
 */
exports.fetchStudent = function fetchStudent(data) {
  return new Promise((resolve, reject) => {
    const studentData = {...data};
    delete studentData.student;
    data.student.get()
        .then((student) => {
          studentData.student = this.stripTechnicalFields(student.data());
          resolve(studentData);
        });
  });
};

function logRequest(id, req) {
  if (req) {
    console.log(`[${id}] ${req.method} - ${req.url}`);
  }
};

function logResponse(id, res) {
  if (res) {
    console.log(`[${id}] ${res.statusCode}`);
  }
};

exports.executeRequest = (fun, req, res) => {
  requestId = crypto.randomBytes(8).toString('hex');
  logRequest(requestId, req);
  v = fun(req, res);
  logResponse(requestId, res);
  return v;
};
