const router = require('express').Router()
const login = require('../controllers/auth.controllers')
const usersServices = require('../services/users.services')


router.post('/login', login, usersServices.postNewUser)

module.exports = router