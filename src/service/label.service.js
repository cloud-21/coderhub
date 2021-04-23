const connect = require('../app/database');

class LabelService {
  async create(name){
    const statement = `INSERT INTO label (name) VALUES (?);`;
    const [result] = await connect.execute(statement, [name]);
    return result;
  }
}

module.exports = new LabelService();