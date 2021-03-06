const Router = require('koa-router');

const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware');

const {
  create,
  reply,
  update,
  remove,
  list
} = require('../controller/comment.controller');

const commentRouter = new Router({prefix: '/comment'});

commentRouter.post('/', verifyAuth, create);
commentRouter.post('/reply', verifyAuth, reply);

// 修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update);
commentRouter.delete('/:commentId',verifyAuth, verifyPermission, remove);

// 获取评论
commentRouter.get('/',list)

module.exports = commentRouter;