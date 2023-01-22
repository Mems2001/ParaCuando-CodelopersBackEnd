const models = require('../database/model')

const findCountryByName = async(name) => {
  return await models.Countries.findOne({
    where: {
      name
    }
  })
}

module.exports = {
  findCountryByName
}