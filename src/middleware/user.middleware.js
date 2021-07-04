const errorType = require("../contants/error-types");
const service = require("../service/user.service");
const { md5Password } = require('../utils/handle-password')

const verifyUser = async (ctx, next) => {
  // 获取用户名和密码
  const { name, password } = ctx.request.body;
  console.log("验证用户中间件");
  // 判断用户名和密码是否为空
  if(!name || !password) {
    console.log("用户名或密码是空的");
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }

  // 判断用户名是否被注册过
  const result = await service.getUserByName(name);
  console.log(result);
  if(result.length) {
    console.log("此用户名已被注册");
    const error = new Error(errorType.USER_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx)
  }
  
  await next();
}

const handlePassword = async (ctx, next) => {
  console.log("检查密码中间件");
  const { password } = ctx.request.body;
  ctx.request.body.password = md5Password(password);
  
  await next();
}

module.exports = {
  verifyUser,
  handlePassword
}