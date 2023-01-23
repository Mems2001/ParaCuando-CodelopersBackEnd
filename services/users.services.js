const UsersControllers = require('../controllers/users.controllers')
const usersController = new UsersControllers()

const getUserByUserName = (req, res) => {
  const userName = req.params.user_name

  usersController.findUsersByUserName(userName)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      })
    })
}

const postNewUser = (req , res) => {
  const {first_name , last_name , user_name , email , password , phone , countryId} = req.body
  usersController.createUser({first_name , last_name , user_name , email , password , phone , countryId})
    .then(data => {
      return res.status(201).json({
        User: data.newUser ,
        profile: data.newProfile
      })
    })
    .catch(err => {
      res.status(400).json({
        message: err.message ,
        fields: {
          first_name: 'string' ,
          last_name: 'string' ,
          user_name: 'string' ,
          email: 'string@email.com' ,
          password: 'string' ,
          phone: 999999999 ,
          countryId: 'uuid'
        }
      })
    })
  
}

const getUserById = (req , res) => {
  const userId = req.params.user_id
  // const altId = req.user.id
  const altId = false

  usersController.findUserById2(userId , altId)
    .then(data => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).json({
          message: 'Invalid ID'
        })
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      })
    })
  
}

const getAllUsers = (req , res) => {
  usersController.findAllUsers()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      })
    })
} 

const getOwnProfile = (req , res) => {
  const userId = req.user.id
  // const {userId} = req.body

  usersController.findOwnProfile(userId)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      })
    })
}

const putUser = (req, res) => {
  const userId = req.user.id
  const altId = req.params.user_id
  // const {userId} = req.body
  const {firstName , lastName , userName} = req.body

  if (userId === altId) {
    if (firstName && lastName && userName) {
      usersController.updateUser(userId , {
        firstName , lastName , userName
      })
        .then(data => {
          res.status(200).json({
            message: 'User updated'
          })
        })
        .catch(err => {
          res.status(400).json({
            message: err.message
          })
        })
    } else {
      res.status(400).json({
        message: 'All fields are required' ,
        fields: {
          firstName: 'string' ,
          lastName: 'string' ,
          userName: 'string'
        }
      })
    }
  } else {
    res.status(401).json({
      message: 'You can only update your own profile'
    })
  }
}

module.exports = {
  getUserByUserName ,
  postNewUser ,
  getUserById ,
  getAllUsers ,
  getOwnProfile ,
  putUser
}