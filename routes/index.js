const usersRouter = require('./users');
const articleRouter = require('./articles');
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const logoutRouter = require('./logout');

module.exports = {
  usersRouter,
  articleRouter,
  signupRouter,
  signinRouter,
  logoutRouter,
};
