const errorType = require('../contants/error-types');

const errorHandler = (error, ctx) => {
  console.log(error.message);
  let status, message;
  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; //bad request
      message = "用户名或密码不能为空";
    break;
    case errorType.USER_ALREADY_EXISTS:
      status = 409; //conflict 冲突
      message = "用户名已经存在";
    break;
    default: 
      status = 404;
      message = "发生错误了";
  }

  ctx.status = status;
  ctx.body = message;

}

module.exports = errorHandler;