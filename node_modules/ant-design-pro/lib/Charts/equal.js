'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint eqeqeq: 0 */

function equal(old, target) {
  var r = true;
  for (var prop in old) {
    if (typeof old[prop] === 'function' && typeof target[prop] === 'function') {
      if (old[prop].toString() != target[prop].toString()) {
        r = false;
      }
    } else if (old[prop] != target[prop]) {
      r = false;
    }
  }
  return r;
}

exports.default = equal;
module.exports = exports['default'];