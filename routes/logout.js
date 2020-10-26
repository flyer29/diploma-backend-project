const logoutRouter = require('express').Router();

const logout = require('../controllers/logout');

logoutRouter.post('/', logout);

module.exports = logoutRouter;
