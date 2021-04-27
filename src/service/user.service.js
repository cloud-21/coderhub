const connection = require("../app/database")

class UserService {
  async create(user) {
    const { name, password } = user;
    const statement = `INSERT INTO user (name, password) VALUES (?,?);`;
    const result = await connection.execute(statement, [name,password]);
    return result[0];
  }

  async getUserByName(name) {
    const statement = `SELECT * from user WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }

  async updateAvatarByUserId(avatarUrl, id) {
    const statement = `UPDATE user SET avatarUrl=? WHERE id=?;`;
    const [result] = await connection.execute(statement, [avatarUrl, id]);
    return result ? true : false;
  }
}

module.exports = new UserService();