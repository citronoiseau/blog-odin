const prisma = require("../../prisma/client");

class UserService {
  async getUserByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
  async getUserById(id) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async addUser(first_name, last_name, email, password) {
    return await prisma.user.create({
      data: {
        firstName: first_name,
        lastName: last_name,
        email: email,
        password: password,
      },
    });
  }

  async upgradeUser(id) {
    return await prisma.user.update({
      where: { id: id },
      data: { role: "AUTHOR" },
    });
  }
}

module.exports = new UserService();
