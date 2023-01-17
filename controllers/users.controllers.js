const models = require('../database/model')
const uuid = require('uuid')
const { findRoleByName } = require('./roles.controllers')
const { hashPassword } = require('../utils/cypto')

class usersControllers {
  constructor (){
    
  }
  async findUsersByLastName(lastName) {
    const data = await models.Users.findAll({
      where: {
        lastName
      }
    })
  
    return data
  }

  // For services <----------------------
  
  async findUsersByUserName(userName) {
    const data = await models.Users.findOne({
      where: {
        userName
      }
    })
  
    return data
  }

  async findUserById(userId) {
    return await models.Users.findOne({
      where: {
        id: userId
      }
    })
  }

  async findAllUsers() {
    return await models.Users.findAll()
  }
  
  async createUser(obj) {
    const transaction = await models.sequelize.transaction()
    const rolePublic = await findRoleByName('public')
    try {
      
      const newUser = await models.Users.create({
        id: uuid.v4() ,
        firstName: obj.first_name ,
        lastName: obj.last_name ,
        userName: obj.user_name ,
        email: obj.email ,
        password: hashPassword(obj.password)
      } , {transaction})

      // console.log(newUser)
      // console.log(newUser.dataValues.id)

      const newProfile = await models.Profiles.create({
        id: uuid.v4() ,
        userId: newUser.dataValues.id ,
        roleId: rolePublic.id ,
        imageUrl: obj.imageUrl ,
        codePhone: obj.codePhone ,
        phone: obj.phone ,
        // countryId
      } , {transaction})
  
      await transaction.commit()
      return {newUser , newProfile}
    } catch(error) {
      await transaction.rollback()
      throw error
    }
  }
}


module.exports = usersControllers