const service = require("../service/user.service");
const fileService = require('../service/file.service');
const {AVATAR_PATH} = require('../contants/file-path');

const fs = require('fs');

class UserController {
  async create(ctx, next) {
    // 获取参数
    console.log("创建用户中间件");
    console.log(ctx.request.body);
    let {name, password} = ctx.request.body;
    let user = {
      name,
      password
    }

    // 查询数据
    const result = await service.create(user);

    // 返回数据
    ctx.body = result;
  }

  async avatarInfo(ctx, next) {
    const {userId} = ctx.params;
    const avatarInfo = await fileService.getAvatarByUserId(userId);
    ctx.response.set('content-type', avatarInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}

module.exports = new UserController();