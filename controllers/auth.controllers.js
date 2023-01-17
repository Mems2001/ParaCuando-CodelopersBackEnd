const Users = require('../database/model/users')
const bcrypt = require('bcrypt')
const generateJWT = require('../utils/generate-jwt')

const login = async(req, res) => {
  const {email, password} = req.body

  try {
    // Verify email
    const user = await Users.findOne({email})
    if (!user) {
      return res.status(400).json({
        message: 'User or Password are not correct'
      })
    }

    // Verify password
    const validPassword = bcrypt.compareSync(password, user.password)
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
  login,
}
