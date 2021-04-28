const momentService = require('../service/moment.service');
const fileService = require('../service/file.service');
const {PICTURE_PATH} = require('../contants/file-path');

const fs = require('fs');
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
  async update(ctx, next) {
    // 获取数据（momentId)
    const {momentId} = ctx.params;
    const { content } = ctx.request.body;

    // 修改内容
    const result = await momentService.update(content, momentId);
    console.log(result);
    ctx.body = result;
    await next();
  }
  async remove (ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.remove(momentId);
    ctx.body = result;
    await next();
  }

  async addLabels(ctx, next) {
    const labels = ctx.labels;
    const { momentId } = ctx.params;
    console.log(labels, momentId);

    for(let label of labels) {
      const isExist = await momentService.hasLabel(momentId, label.id);
      if(!isExist) {
        await momentService.addLabel(momentId, label.id);
      }
    }

    ctx.body = "给动态添加标签成功";
  }

  async fileInfo(ctx, next) {
    let {filename} = ctx.params;
    const fileInfo = await fileService.getFileInfoByFilename(filename);
    const {type} = ctx.query;
    const types = ["small","middle","large"];
    if(types.some(item => item === type)) {
      filename = filename + '-' + type;
    }

    ctx.response.set('content-type',fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);

  }
}

module.exports = new MomentController();