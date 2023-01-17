const router = require('express').Router()
const { roleMiddleware } = require('../middlewares/role.middleware')
const { validateJWT } = require('../middlewares/validate.middleware')
const usersServices = require('../services/users.services')

router.route('/')
  .post(usersServices.postNewUser)
  .get(roleMiddleware, usersServices.getAllUsers)

router.get('/:user_id' , usersServices.getUserById)

router.get('/:user_id/votes') // Waiting for Josue

router.get('/:user_id/publications') // Waiting for Josue

// router.get('/:user_name' , usersServices.getUserByUserName)

module.exports = router