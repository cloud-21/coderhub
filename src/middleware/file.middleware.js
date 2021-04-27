const service = require('../service/file.service');

const Multer = require('koa-multer');
const { AVATAR_PATH, PICTURE_PATH } = require('../contants/file-path');

const fs = require('fs');
const path = require('path');

const avatarUpload = new Multer({
  dest: AVATAR_PATH
})

const avatarHandler = avatarUpload.single('avatar');

const unlinkPreAvatar = async (ctx, next) => {
  const {id} = ctx.user;

  // 原头像信息
  const preAvatarInfo = await service.getAvatarByUserId(id);
  if(preAvatarInfo) {
    try {
      const avatarPath = path.resolve(`${AVATAR_PATH}/${preAvatarInfo.filename}`);
      fs.unlinkSync(avatarPath,err => {
        if(err) {
          throw err
        }
      })
      console.log("删除原头像成功");
    } catch (error) {
      throw error;
    }
  }
  await next();
}

module.exports = {
  avatarHandler,
  unlinkPreAvatar
}