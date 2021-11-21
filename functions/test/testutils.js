/**
 * Simple sleep imlementation
 * @param {number} ms timeout
 * @return {Promise} a promise
 */
exports.sleep = function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
