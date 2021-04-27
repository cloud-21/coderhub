const jwt = require('jsonwebtoken');
const {PRIVATE_KEY} = require('../app/config')

class AuthController {
  async login(ctx, next) {
    const {id, name} = ctx.user;
    const token = jwt.sign({id, name}, PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 60 * 60 * 24 * 365
    })

    ctx.body = {
      id,
      name,
      token
    }
  }
}
const success = async (ctx, next) => {
  ctx.body = "验证成功";
}

module.exports = new AuthController();
module.exports.success = success;