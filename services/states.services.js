const statesControllers = require('../controllers/states.controllers')

const getAllStates = (req , res) => {
  statesControllers.findAllStates()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      })
    })
}

module.exports = {
  getAllStates
}