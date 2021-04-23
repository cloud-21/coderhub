const connect = require('../app/database');
class AuthService {
  async checkResource(tableName, resourceId, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`
    const [result] = await connect.execute(statement, [resourceId, userId]);
    return result.length > 0 ? true : false;
  }
}

module.exports = new AuthService();