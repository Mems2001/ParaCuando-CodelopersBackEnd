const models = require('../database/model')
const uuid = require('uuid')
const { findRoleByName } = require('./roles.controllers')

const createProfile = async(obj , user_id , role_id , country_id) => {
  const transaction = await models.sequelize.transaction()

  try {
    const newProfile = await models.Profiles.create({
      id: uuid.v4() ,
      user_id ,
      role_id ,
      imageUrl: obj.imageUrl ,
      codePhone: obj.codePhone ,
      phone: obj.phone ,
      country_id
    } , {transaction})

    await transaction.commit()
    return newProfile
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

const verifyAdmin = async(user_id) => {
  try {
    const profiles = await models.Profiles.scope('admin').findAll({
      where: {
        user_id
      }
    })
    
    const admin = await findRoleByName('admin')
    
    for (let profile of profiles) {
      if (admin.id === profile.role_id) {
        return true
      }
    }
  
    return false

  } catch (error) {
    console.log(error)
    return false
  }

}

const findProfileByUserId = async(user_id) => {
  const publicRole = await findRoleByName('public')
  
  return await models.Profiles.findOne({
    where: {
      user_id ,
      role_id: publicRole.id
    }
  })
}

module.exports = {
  createProfile ,
  verifyAdmin ,
  findProfileByUserId
}