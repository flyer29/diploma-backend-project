const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const { messages } = require('../config');

const getAllMyArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      if (articles.length === 0) {
        throw new NotFoundError(messages.emptyArticleList);
      }
      res.send({ data: articles });
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    source,
    link,
    image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

const deleteArticleById = (req, res, next) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (!article) {
        throw new NotFoundError(messages.notFoundArticleById);
      }
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError(messages.canNotDeleteArticle);
      }
      Article.deleteOne(article)
        .then(() => {
          res.send({ message: messages.articleDeleted });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getAllMyArticles,
  createArticle,
  deleteArticleById,
};
