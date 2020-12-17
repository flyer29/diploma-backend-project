const PasswordValidator = require('password-validator');
const validator = require('validator');
const rateLimit = require('express-rate-limit');
const BadRequestError = require('./errors/bad-request-error');

const secretKey = 'dev-secret';
const messages = {
  emptyArticleList: 'У вас нет сохранённых статей',
  notFoundArticleById: 'Статья не найдена',
  canNotDeleteArticle: 'Вы не можете удалить эту статью',
  articleDeleted: 'Статья успешно удалена',
  incorrectPassword: 'Необходимо указать пароль, состоящий как минимум из 8 символов, включающих в себя цифры и буквы',
  incorrectLink: 'Необходимо указать коррекную ссылку',
  nonUniqEmail: 'Пользователь с таким email уже существует',
  authorizationRequired: 'Необходима авторизация',
  serverError: 'На сервере произошла ошибка',
  authorizationError: 'Необходимо указать корректную почту или пароль',
  nonExistentUrl: 'Запрашиваемый ресурс не найден',
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
});

const corsOptions = {
  origin: [
    'http://my-news-app.ru',
    'https://my-news-app.ru',
    'http://localhost:8080',
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

const passwordSchema = new PasswordValidator();
passwordSchema
  .is()
  .min(8)
  .has()
  .not()
  .spaces();

const urlValidation = ((value) => {
  if (!validator.isURL(value)) {
    throw new BadRequestError(messages.incorrectLink);
  }
  return value;
});

module.exports = {
  passwordSchema,
  urlValidation,
  corsOptions,
  secretKey,
  limiter,
  messages,
};
