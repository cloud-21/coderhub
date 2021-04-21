const jwt = require('jsonwebtoken');

const errorType = require("../contants/error-types");
const service = require("../service/user.service");
const {md5Password} = require('../utils/handle-password');

const {PUBLIC_KEY} = require('../app/config');

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

const verifyAuth = async (ctx, next) => {
  console.log("验证授权的middleware...");
  const authorization = ctx.headers.authorization;
  if(!authorization) {
    const error = new Error(errorType.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '');
  console.log(token);
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })    
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorType.UNAUTHORIZATION);
    ctx.app.emit('error', error, ctx)
  }

}

module.exports = {
  verifyLogin,
  verifyAuth
}