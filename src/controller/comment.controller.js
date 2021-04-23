const commentService = require('../service/comment.service');

class CommentController {
  async create(ctx, next) {
    const { mommentId, content } = ctx.request.body;
    const { id } = ctx.user;
    const result = await commentService.create(mommentId, content, id);
    ctx.body = result;
  }
  async reply(ctx, next) {
    const { mommentId, commentId, content} = ctx.request.body;
    const { id } = ctx.user;
    const result = await commentService.reply(mommentId, commentId, content, id);
    ctx.body = result;
  }
  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;

    const result = await commentService.update(commentId, content);
    ctx.body = result;
  }
  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const result = await commentService.remove(commentId);
    ctx.body = result;
  }
  async list(ctx, next) {
    console.log(ctx.query);
    const { momentId } = ctx.query;
    const result = await commentService.getCommentsByMomentId(momentId);
    ctx.body = result;
  }
}

module.exports = new CommentController();