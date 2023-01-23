const models = require('../database/model')
const profilesControllers = require('../controllers/profiles.controllers')

const findAllPublicationsFromUser = async(userId) => {
  const profile = await profilesControllers.findProfileByUserId(userId)
  // console.log(profile)

  return await models.Publications.findAll({
    where: {
      profileId : profile.id
    }
  })
}

module.exports = {
  findAllPublicationsFromUser
}