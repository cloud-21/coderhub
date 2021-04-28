const service = require('../service/file.service');

const Multer = require('koa-multer');
const Jimp = require('jimp');
const { AVATAR_PATH, PICTURE_PATH } = require('../contants/file-path');

const fs = require('fs');
const path = require('path');

const avatarUpload = new Multer({
  dest: AVATAR_PATH
})

const pictureUpload = new Multer({
  dest: PICTURE_PATH
})

const avatarHandler = avatarUpload.single('avatar');
const pictureHandler = pictureUpload.array('picture', 9);

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

const pictureResize = async (ctx, next) => {
  const files = ctx.req.files;
  // 处理图片(jimp)
  for(let file of files) {
    const filePath = path.join(file.destination,file.filename);
    Jimp.read(file.path).then(image => {
      image.resize(1280, Jimp.AUTO).write(`${filePath}-large`);
      image.resize(640, Jimp.AUTO).write(`${filePath}-middle`);
      image.resize(320, Jimp.AUTO).write(`${filePath}-small`);
    })
  }

  await next();
}

module.exports = {
  avatarHandler,
  unlinkPreAvatar,
  pictureHandler,
  pictureResize
}