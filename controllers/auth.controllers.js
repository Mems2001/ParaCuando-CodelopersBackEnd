const usersControllers = require('./users.controllers')
const { comparePasswords } = require('../utils/cypto')
const usersController = new usersControllers()

class authControllers {
  constructor () {

  }

  async checkCredentials (email , password) {
    try {
      const user =  await usersController.findUserByEmail(email)
      const verify = comparePasswords(password , user.password)
      if (verify) {
        return user
      }
      return null
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

module.exports = authControllers