const jwt = require('jsonwebtoken')

const validateJWT = (req, res, next) => {
  const token = req.header('token')

  if (!token) {
    return res.status(401).json({
      message: 'There is no token in the request'
    })
  }

  try {

    const {uid} = jwt.verify(token, process.env.JWT_SECRET)

    req.uid = uid

    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({
      message: 'Invalid token'
    })
  }
  
}

module.exports = {
  validateJWT
}