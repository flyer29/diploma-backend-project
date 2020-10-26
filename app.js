require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');

const corsOptions = {
  origin: [
    'https://mynwesapp.tk',
    'http://localhost:8080',
    'https://flyer29.github.io//news-explorer-frontend',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
  ],
  credentials: true,
};

const { errors } = require('celebrate');
const {
  usersRouter,
  articleRouter,
  signupRouter,
  signinRouter,
  logoutRouter,
} = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { apiLink, limiter } = require('./config');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const urlDoesNotExist = require('./controllers/url-does-not-exist');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(apiLink, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('*', cors(corsOptions));
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/logout', auth, logoutRouter);
app.use('/articles', auth, articleRouter);
app.use('/users', auth, usersRouter);
app.use('*', urlDoesNotExist);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT);
