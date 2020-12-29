"use strict";

module.exports = {
  send: function send(err, req, res) {
    var code = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 400;
    console.log("error: ".concat(err));
    res.status(code).json({
      error: err
    });
  }
};