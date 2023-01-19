const models = require('../database/model')

const findRoleByName = async(roleName) => {
  return await models.Roles.findOne({
    where: {
      name: roleName
    }
  })
}

module.exports = {
  findRoleByName
}