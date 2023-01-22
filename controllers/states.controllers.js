const models = require('../database/model')

const findStateByName = async(name) => {
  return await models.States.findOne({
    where: {
      name
    }
  })
}

module.exports = {
  findStateByName
}