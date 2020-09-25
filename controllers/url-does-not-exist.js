const NotFoundError = require('../errors/not-found-error');
const { messages } = require('../config');

const urlDoesNotExist = () => {
  throw new NotFoundError(messages.nonExistentUrl);
};

module.exports = urlDoesNotExist;
