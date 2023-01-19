const { verifyAdmin } = require('../controllers/profiles.controllers')

const roleMiddleware = async(req , res , next) => {
  try {
    const admin = await verifyAdmin(req.user.id)
    // console.log(admin)

    if (admin) {
      next()
    } else {
      res.status(401).json({
        message: 'Permission denied'
      })
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

module.exports = {
  roleMiddleware
}