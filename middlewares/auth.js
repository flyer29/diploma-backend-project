const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorized-error');
const { secretKey, messages } = require('../config');

const auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnauthorizedError(messages.authorizationRequired);
  }
  let payload;
  const token = req.cookies.jwt;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : secretKey);
  } catch (err) {
    throw new UnauthorizedError(messages.authorizationRequired);
  }
  req.user = payload;
  next();
};

module.exports = auth;
