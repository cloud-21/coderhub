const Router = require('koa-router');
const {
  verifyAuth
} = require('../middleware/auth.middleware');
const {
  avatarHandler,
  unlinkPreAvatar
} = require('../middleware/file.middleware');
const {
  saveAvatarInfo
} = require('../controller/file.controller');

const fileRouter = new Router({prefix: '/upload'});

fileRouter.post('/avatar', verifyAuth, avatarHandler, unlinkPreAvatar, saveAvatarInfo)

module.exports = fileRouter;