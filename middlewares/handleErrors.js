const { validationResult } = require('express-validator')

module.exports = () => {
  return (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).send(errors)
    }

    next()
  }
}
