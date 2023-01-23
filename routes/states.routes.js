const router = require('express').Router()
const statesServices = require('../services/states.services')

router.get('/' , statesServices.getAllStates)

module.exports = router