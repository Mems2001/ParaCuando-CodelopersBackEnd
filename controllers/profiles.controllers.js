const models = require('../database/model')
const uuid = require('uuid')
const { findRoleByName } = require('./roles.controllers')

const createProfile = async(obj , userId , roleId , countryId) => {
  const transaction = await models.sequelize.transaction()

  try {
    const newProfile = await models.Profiles.create({
      id: uuid.v4() ,
      userId ,
      roleId ,
      imageUrl: obj.imageUrl ,
      codePhone: obj.codePhone ,
      phone: obj.phone ,
      countryId
    } , {transaction})

    await transaction.commit()
    return newProfile
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

const verifyAdmin = async(userId) => {
  try {
    const user = await models.Profiles.findOne({
      where: {
        userId
      }
    })
  
    const admin = await findRoleByName('admin')
  
    if (admin.id === user.roleId) {
      return true
    }
  
    return false

  } catch (error) {
    console.log(error)
    return false
  }

} 

module.exports = {
  createProfile ,
  verifyAdmin
}