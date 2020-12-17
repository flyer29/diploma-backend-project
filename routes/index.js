const router = require('express').Router();
const auth = require('../middlewares/auth');
const urlDoesNotExist = require('../controllers/url-does-not-exist');

const usersRouter = require('./users');
const articleRouter = require('./articles');
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const logoutRouter = require('./logout');

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use('/logout', auth, logoutRouter);
router.use('/articles', auth, articleRouter);
router.use('/users', auth, usersRouter);
router.use('*', urlDoesNotExist);

module.exports = router;
