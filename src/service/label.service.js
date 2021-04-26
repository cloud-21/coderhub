const connect = require('../app/database');

class LabelService {
  async create(name){
    const statement = `INSERT INTO label (name) VALUES (?);`;
    const [result] = await connect.execute(statement, [name]);
    return result;
  }

  async getTableByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`;
    const [result] = await connect.execute(statement, [name]);
    return result[0];
  }

  async list (limit, offset) {
    const statement = `SELECT * FROM label LIMIT ?, ?;`;
    const result = await connect.execute(statement, [limit, offset]);
    return result[0];
  }
}

module.exports = new LabelService();