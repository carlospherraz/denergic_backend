'use strict';
var jwt = require('jwt-simple');
var moment = require('moment');

function Token(token) {
  token = getTokenData(token);
  this.email = token.email;
  this.expiration = token.expiration;
}

function getTokenData(token) {
  let tokenConfig = global.config.token;
  try {
    let decoded = jwt.decode(token, tokenConfig.secretKey);
    return decoded;
  } catch (err) {
    return {};
  }
}

Token.createUserToken = function (email) {
  let tokenConfig = global.config.token;
  let expires = moment().add(tokenConfig.expiration.number, tokenConfig.expiration.type).valueOf();
  let token = jwt.encode({
    email: email,
    expiration: expires
  }, tokenConfig.secretKey);

  return token;
};

Token.prototype.getEmail = function () {
  return this.email;
};

Token.prototype.isValid = function () {
  return this.expiration >= Date.now();
};

module.exports = Token;