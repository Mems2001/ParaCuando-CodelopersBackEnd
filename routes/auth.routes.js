const router = require('express').Router()
// const login = require('../controllers/auth.controllers')
const authServices = require('../controllers/auth.controllers')

router.post('/login', authServices.login)

module.exports = router