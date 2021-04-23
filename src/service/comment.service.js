const connect = require('../app/database');

class CommentService {
  async create (momentId, content, id) {
    const statement = `INSERT INTO comment (moment_id, content, user_id) VALUES(?,?,?);`;
    const [result] = await connect.execute(statement, [momentId, content, id]);
    return result;
  }
  async reply(mommentId, commentId, content, id) {
    const statement = `INSERT INTO comment (moment_id, comment_id, content, user_id) VALUES(?,?,?,?);`;
    const [result] = await connect.execute(statement, [mommentId, commentId, content, id]);
    return result;
  }
  async update(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
    const [result] = await connect.execute(statement, [content, commentId]);
    return result;
  }
  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?`;
    const [result] = await connect.execute(statement, [commentId]);
    return result;
  }
  async getCommentsByMomentId(momentId) {
    const statement = `
      SELECT c.id, c.content, c.user_id, c.createAt createTime, c.updateAt updateTime,
      JSON_OBJECT('id',u.id, 'name',u.name) user
      FROM comment c 
      LEFT JOIN user u ON u.id = c.user_id
      WHERE c.moment_id = 25;
    `;
    const [result] = await connect.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new CommentService();