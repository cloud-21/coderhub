const Router = require('koa-router');

const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels  
} = require('../controller/monent.controller');
const { 
  verifyAuth,
  verifyPermission 
} = require('../middleware/auth.middleware');

const {
  verifyLabelsExists
} = require('../middleware/label.middleware');

const momentRouter = new Router({prefix: '/moment'});

momentRouter.post('/', verifyAuth , create);
momentRouter.get('/', list);
momentRouter.get('/:momentId', detail);

// 1.用户必需登录 2.用户必需具有修改权限
momentRouter.patch('/:momentId', verifyAuth , verifyPermission, update);
momentRouter.delete('/:momentId', verifyAuth , verifyPermission, remove);

// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelsExists,  addLabels);

module.exports = momentRouter; 