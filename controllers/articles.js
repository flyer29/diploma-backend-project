const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const getAllMyArticles = (req, res, next) => {
  Article.find(req.user._id)
    .then((articles) => {
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
        throw new NotFoundError('Статья не найдена');
      }
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить эту статью');
      }
      Article.deleteOne(article)
        .then(() => {
          res.send({ message: 'Статья успешно удалена' });
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
