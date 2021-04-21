const connect = require('../app/database');

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?,?);`;
    const [result] = await connect.execute(statement,[content, userId]);
    return result;
  }
  async getMomentById(id) {
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, 
        JSON_OBJECT('id', u.id, 'name', u.name) author
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      WHERE m.id = ?;
    `;
    const [result] = await connect.execute(statement, [id]);
    return result[0];
  }
  async getMomentList(offset, size) {
    const statement = `
    SELECT 
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, 
      JSON_OBJECT('id', u.id, 'name', u.name) author
    FROM moment m
    LEFT JOIN user u ON m.user_id = u.id
    LIMIT ?, ?;
  `;
  const [result] = await connect.execute(statement, [offset, size]);
  return result;
  }
}

module.exports = new MomentService();