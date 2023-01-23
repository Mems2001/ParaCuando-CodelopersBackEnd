const router = require('express').Router()
const { roleMiddleware } = require('../middlewares/role.middleware')
const passportJWT = require('../middlewares/auth.middleware')

const usersServices = require('../services/users.services')
const publicationsServices = require('../services/publications.services')
const votesServices = require('../services/votes.services')

router.route('/')
  .post(usersServices.postNewUser)
  .get(passportJWT.authenticate('jwt' , {session:false}), roleMiddleware, usersServices.getAllUsers)

router.get('/user-info' , passportJWT.authenticate('jwt' , {session:false}) , usersServices.getOwnProfile) // Middleware pending

router.route('/:user_id')
  .get(usersServices.getUserById)
  .put( passportJWT.authenticate('jwt' , {session:false}) , usersServices.putUser) // Middleware pending
// router.get('/:user_name' , usersServices.getUserByUserName)

router.get('/:user_id/votes' , votesServices.getAllVotesFromUser)

router.get('/:user_id/publications' , publicationsServices.getAllPublicationsFromUser) 

module.exports = router