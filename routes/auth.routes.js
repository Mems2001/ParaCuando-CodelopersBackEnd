const router = require('express').Router()
// const authServices = require('../controllers/auth.controllers')
const authServices = require('../services/auth.services')

// router.post('/login', authServices.login)
router.post('/login', authServices.postLogin)

module.exports = router