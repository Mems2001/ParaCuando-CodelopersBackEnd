
const router = require('express').Router()
// const login = require('../controllers/auth.controllers')
const authServices = require('../controllers/auth.controllers')

router.post('/login', authServices.login)
router.post('/sign-up', authServices.signUp)
router.get('/user-info', authServices.userInfo)



module.exports = router