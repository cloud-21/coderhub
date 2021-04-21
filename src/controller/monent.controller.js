const momentService = require('../service/moment.service');
class MomentController {
  async create(ctx, next) {
    // 获取参数
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    console.log(userId, content);

    // 将内容插入数据库
    const result = await momentService.create(userId, content);
    ctx.body = result;
  }
  async detail(ctx, next) {
    // 获取数据（momentId)
    const momentId = ctx.params.momentId;

    // 根据id去查询这条数据
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;

    await next();
  }
  async list(ctx, next) {
    // 获取数据（offset/size)
    const {offset, size} = ctx.query;

    // 查询列表
    const result = await momentService.getMomentList(offset, size); 

    ctx.body = result;
  }
}

module.exports = new MomentController();