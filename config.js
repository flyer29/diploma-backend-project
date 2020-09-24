const PasswordValidator = require('password-validator');
const validator = require('validator');
const rateLimit = require('express-rate-limit');
const BadRequestError = require('./errors/bad-request-error');

const apiLink = 'mongodb://localhost:27017/news-explorer';
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
  max: 100,
});

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
  apiLink,
  secretKey,
  limiter,
  messages,
};
