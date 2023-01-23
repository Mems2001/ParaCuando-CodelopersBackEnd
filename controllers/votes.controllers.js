const models = require('../database/model')
const { findProfileByUserId } = require('./profiles.controllers')

const findAllVotesFromUser = async(userId) => {
  const profile = await findProfileByUserId(userId)

  return await models.Votes.findAll({
    where: {
      profileId: profile.id
    }
  })
}

module.exports = {
  findAllVotesFromUser
}