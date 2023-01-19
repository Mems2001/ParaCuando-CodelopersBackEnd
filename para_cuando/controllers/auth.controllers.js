const generateJWT = require('../utils/generate-jwt')
const usersServices = require('../controllers/users.controllers')
const { comparePasswords } = require('../utils/cypto')
const usersService = new usersServices()

const login = async(req, res) => {
  const {email, password} = req.body

  try {
    // Verify email
    const user = await usersService.findUserByEmail(email)
    if (!user) {
      return res.status(400).json({
        message: 'User or Password are not correct'
      })
    }

    // Verify password
    const validPassword = comparePasswords(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        message: 'User or Password are not correct'
      })
    }

    // Generate JWT
    const token = await generateJWT(user.id)

    res.json({
      user,
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Something went wrong, talk to the administrator'
    })
  }
 
}

module.exports = {
  login
}
