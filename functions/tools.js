const xss = require('xss');
const Joi = require('joi');

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
