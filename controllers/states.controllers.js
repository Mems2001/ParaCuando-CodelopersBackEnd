const models = require('../database/model')

const findStateByName = async(name) => {
  return await models.States.findOne({
    where: {
      name
    }
  })
}

// For services <-----------------

const findAllStates = async() => {
  return await models.States.findAll(
    {
      include: {
        model: models.Countries ,
        as: 'Country'
      }
    }
  )
}

module.exports = {
  findStateByName ,
  findAllStates
}