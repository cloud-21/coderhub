const connect = require('../app/database');
const errorType = require('../contants/error-types');

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
    JSON_OBJECT('id', u.id, 'name', u.name) author,
    IF(COUNT(l.id),
    JSON_ARRAYAGG(
      JSON_OBJECT("id", l.id,"name", l.name)
    ), 
    NULL) labels,
    
    (SELECT IF(COUNT(c.id), JSON_ARRAYAGG(
        JSON_OBJECT('id',c.id, 'content',c.content , 'userId',c.user_id, 'createTime', c.createAt,
                    'user',JSON_OBJECT('id',cu.id, 'userName',cu.name))
      )
    ,NULL) FROM comment c LEFT JOIN user cu ON c.user_id = cu.id WHERE m.id = c.moment_id) comments

  FROM moment m
  LEFT JOIN user u ON m.user_id = u.id
  LEFT JOIN moment_label ml ON ml.moment_id = m.id
  LEFT JOIN label l ON l.id = ml.label_id
  WHERE m.id = ?;
    `;
    const [result] = await connect.execute(statement, [id]);
    return result[0];
  }
  async getMomentList(offset, size) {
    const statement = `
    SELECT 
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, 
      JSON_OBJECT('id', u.id, 'name', u.name) author,
      (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount, 
      (SELECT COUNT(*) FROM moment_label ml WHERE m.id = ml.moment_id) labelCount
    FROM moment m
    LEFT JOIN user u ON m.user_id = u.id
    LIMIT ?, ?;
  `;
  const [result] = await connect.execute(statement, [offset, size]);
  return result;
  }
  async update(content, momentId) {
    console.log(content, momentId);
    try {
      const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
      const [result] = await connect.execute(statement, [content, momentId]);
      return result;
    } catch (error) {
      console.log(error);
    }

  }
  async remove (momentId) {
    try {
      const statement = `DELETE FROM moment WHERE id = ?;`
      const [result] = await connect.execute(statement, [momentId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async hasLabel(momentId, labelId) {
    try {
      const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;
      const [result] = await connect.execute(statement, [momentId, labelId]);
      return result[0] ? true : false;
    } catch (err) {
      const error = new Error(errorType.SERVER_ERROR);
    }
  }

  async addLabel(momentId, labelId) {
    try {
      const statement= `INSERT INTO moment_label (moment_id, label_id) VALUES(?,?);`;
      const [result] = await connect.execute(statement, [momentId, labelId]);
      return result;
    } catch (err) {
      const error = new Error(errorType.SERVER_ERROR);
    }
  }
}

module.exports = new MomentService();