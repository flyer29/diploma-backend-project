const articleRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlValidation } = require('../config');

const {
  getAllMyArticles,
  createArticle,
  deleteArticleById,
} = require('../controllers/articles');

articleRouter.get('/', getAllMyArticles);
articleRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30),
    title: Joi.string().required().min(1),
    text: Joi.string().required().min(2),
    date: Joi.date().required(),
    source: Joi.string().required().min(2).max(30),
    image: Joi.string().required().custom(urlValidation),
    link: Joi.string().required().custom(urlValidation),
  }),
}), createArticle);
articleRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), deleteArticleById);

module.exports = articleRouter;
