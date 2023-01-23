const publicationsControllers = require('../controllers/publications.controllers')

const getAllPublicationsFromUser = (req, res) => {
  const userId = req.params.user_id

  publicationsControllers.findAllPublicationsFromUser(userId)
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
  getAllPublicationsFromUser
}