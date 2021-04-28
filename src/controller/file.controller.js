const service = require('../service/file.service');
const userService = require('../service/user.service');

const {APP_HOST, APP_PORT} = require('../app/config');



class FileController {
  async saveAvatarInfo(ctx, next) {
    const {filename, mimetype, size} = ctx.req.file;
    const {id} = ctx.user;
    const result = await service.createAvatar(filename, mimetype, size, id);

    // 更新用户表中的头像字段
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    await userService.updateAvatarByUserId(avatarUrl, id);


    ctx.body = '上传头像成功';
    await next();
  }

  async savePictureInfo(ctx, next) {
    // 获取图片信息
    const files = ctx.req.files;

    const {id} = ctx.user;
    const {momentId} = ctx.query;

    // 将图片信息保存到数据库
    for(let file of files) {
      const {filename, mimetype, size} = file;
      await service.saveFile(filename, mimetype, size, momentId, id);
    }
    ctx.body = "上传动态配图成功";
    await next();
  }


}

module.exports = new FileController();