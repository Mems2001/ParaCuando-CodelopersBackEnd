const votesControllers = require('../controllers/votes.controllers')

const getAllVotesFromUser = (req, res) => {
  const userId = req.params.user_id
  
  votesControllers.findAllVotesFromUser(userId)
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
  getAllVotesFromUser
}