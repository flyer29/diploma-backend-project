require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const {
  usersRouter,
  articleRouter,
  signupRouter,
  signinRouter,
} = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { apiLink, limiter, messages } = require('./config');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000 } = process.env;
const app = express();

const urlDoesNotExist = () => {
  throw new NotFoundError(messages.nonExistentUrl);
};

mongoose.connect(apiLink, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/articles', auth, articleRouter);
app.use('/users', auth, usersRouter);
app.use('*', urlDoesNotExist);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT);
