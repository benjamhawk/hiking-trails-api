const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, keys.secret)
    req.userData = { email: decodedToken, userId: decodedToken.userId }
    next()
  } catch (error) {
    res.status(401).json({ message: 'You are not authenticated' })
  }
}
