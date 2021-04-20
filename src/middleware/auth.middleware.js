const errorType = require("../contants/error-types");
const service = require("../service/user.service");
const {md5Password} = require('../utils/handle-password');

const verifyLogin = async (ctx, next) => {

  const { name, password } = ctx.request.body;

  // 1.判断用户名密码是否为空
  if(!name || !password) {
    console.log("用户名或密码是空的");
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  // 2.判断用户名是否存在
  const result = await service.getUserByName(name);
  const user = result[0];
  console.log(user);
  if(!user) {
    console.log("此用户不存在");
    const error = new Error(errorType.USER_DESE_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx)
  }
  // 3.判断密码是否和数据库中的一致(加密)
  if( md5Password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRENT);
    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = user;
  await next();
}

module.exports = {
  verifyLogin
}