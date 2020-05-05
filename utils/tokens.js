const jwt = require('jwt-simple')
const keys = require('../config/keys')
const bcrypt = require('bcryptjs')

module.exports = {
  tokenForUser: user => {
    const timestamp = new Date().getTime()
    return jwt.encode({ sub: user.id, iat: timestamp }, keys.secret)
  },
  comparePassword: (givenPassword, user, callback) => {
    bcrypt.compare(givenPassword, user.password, (err, success) => {
      if (err) {
        return callback(err)
      } else {
        return callback(null, success)
      }
    })
  }
}
