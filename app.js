require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const {
  usersRouter,
  articleRouter,
  signupRouter,
  signinRouter,
} = require('./routes/index');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/not-found-error');
const { apiLink } = require('./config');

const { PORT = 3000 } = process.env;
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
const urlDoesNotExist = () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
};

mongoose.connect(`${apiLink}`, {
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
