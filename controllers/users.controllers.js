const models = require('../database/model')
const uuid = require('uuid')
const { findRoleByName } = require('./roles.controllers')
const { hashPassword } = require('../utils/cypto')
const CustomError = require('../utils/CustomError')

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

  async findUserByEmail(email) {
    return await models.Users.findOne({
      where: {
        email
      }
    })
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

  async findOwnProfile (userId) {
    return await models.Profiles.findAll({
      where: {
        userId
      } ,
      include: [
        {
          model: models.Users ,
          as: 'User' ,
          attributes: {
            exclude: ['userName' , 'password']
          } 
        } ,
        {
          model: models.Roles ,
          as: 'Role' ,
          attributes: ['name']
        }
      ] ,
      attributes: {
        exclude: ['user_id' , 'role_id' ,'userId' , 'roleId']
      }
    })
  }

  async updateUser (userId , obj) {
    const transaction = await models.sequelize.transaction()

    try {
      const user = await this.findUserById(userId)

      if (!user) {
        throw new CustomError('User not found' , 404 , 'Not found')
      }

      const updatedUser = await user.update({
        firstName: obj.firstName ,
        lastName: obj.lastName ,
        userName: obj.userName
      } , {transaction})

      await transaction.commit()
      return updatedUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}


module.exports = usersControllers