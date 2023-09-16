//
const bcrypt = require("bcryptjs");
class UserDTO {
  constructor(user) {
    this._id = user.id; // id
    this.name = user.name; // username
    this.email = user.email; // user email
  }
}

module.exports = UserDTO;
