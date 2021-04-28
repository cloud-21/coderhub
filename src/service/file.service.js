const connect = require('../app/database');

class FileService {
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES(?,?,?,?);`;
    const updateStatement = `UPDATE avatar SET filename=?, mimetype=?,size=? WHERE user_id=?;`;
    const isExist = await this.getAvatarByUserId(userId);
    if(!isExist) {
      const [result] = await connect.execute(statement, [filename, mimetype, size, userId]);
      return result; 
    }else {
      const [result] = await connect.execute(updateStatement, [filename, mimetype, size, userId]);
      return result;
    }
 
  }

  async getAvatarByUserId(userId) {
    const statement =`SELECT * FROM avatar WHERE user_id = ?;`;
    const [result] = await connect.execute(statement, [userId]);
    return result[0];
  }
  async saveFile(filename, mimetype, size, commentId, userId) {
    const statement = `INSERT INTO file (filename, mimetype, size, moment_id, user_id) VALUES(?,?,?,?,?);`;
    const [result] = await connect.execute(statement,[filename, mimetype, size, commentId, userId]);
    return result;
  }

  async getFileInfoByFilename(filename) {
    const statement =`SELECT * FROM file WHERE filename = ?;`;
    const [result] = await connect.execute(statement, [filename]);
    return result[0];
  }
}

module.exports = new FileService();