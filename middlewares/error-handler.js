const { messages } = require('../config');

const errorHandler = (err, req, res, next) => {
  const {
    statusCode = 500,
    message,
    name,
  } = err;
  if (name === 'ValidationError') {
    res.status(400).send({ message: `${message}` });
    return;
  }
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? messages.serverError
        : message,
    });
  next();
};

module.exports = errorHandler;
