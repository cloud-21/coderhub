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


}

module.exports = new FileController();