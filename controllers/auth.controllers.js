const generateJWT = require('../utils/generate-jwt')
const usersServices = require('../controllers/users.controllers')
const { comparePasswords } = require('../utils/cypto')
const usersService = new usersServices()
import User from '../database/model/users'
import jwt  from 'jsonwebtoken'
import Role from '../database/model/roles'

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

const signUp = async (req, res) => {
  const {userName, email, password, roles} = req.body

  const newUser = new User({
    userName,
    email, 
    password: User.encryptPassword(password)
  })

  if (roles) {
    const foundRoles = await Role.find({name: {$in: roles}})
    newUser.roles = foundRoles.map(role => role.id)
  } else {
    const role = await Role.findOne({name: 'user'})
    newUser.roles = [role.id]
  }

  const savedUser = await newUser.save()

  const token = jwt.sign({id: savedUser.id}, process.env.JWT_SECRET, {
    expiresIn: 86400 // 24 hours
  })
  res.json({token})
}

const userInfo = async (req, res) => {

}

module.exports = {
  login,
  signUp,
  userInfo
}
