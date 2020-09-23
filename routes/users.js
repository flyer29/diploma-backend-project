const usersRouter = require('express').Router();

const {
  getMyInfo,
} = require('../controllers/users');

usersRouter.get('/me', getMyInfo);

module.exports = usersRouter;
