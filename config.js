const PasswordValidator = require('password-validator');
const validator = require('validator');
const rateLimit = require('express-rate-limit');
const BadRequestError = require('./errors/bad-request-error');

const apiLink = 'mongodb://localhost:27017/news-explorer';
const secretKey = 'dev-secret';
const passwordSchema = new PasswordValidator();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

passwordSchema
  .is()
  .min(8)
  .has()
  .not()
  .spaces();

const urlValidation = ((value) => {
  if (!validator.isURL(value)) {
    throw new BadRequestError('Необходимо указать коррекную ссылку');
  }
  return value;
});

module.exports = {
  passwordSchema,
  urlValidation,
  apiLink,
  secretKey,
  limiter,
};
