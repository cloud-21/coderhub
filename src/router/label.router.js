const Router = require('koa-router');

const labelRouter = new Router({prefix: '/label'});

const {
  verifyAuth
} = require('../middleware/auth.middleware')

const {
  create
} = require('../controller/label.controller')

labelRouter.post('/', verifyAuth, create)

module.exports = labelRouter;