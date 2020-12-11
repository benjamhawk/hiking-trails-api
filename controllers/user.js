const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = mongoose.model('users')
const keys = require('../config/keys')

exports.createUser = async (req, res, next) => {
  const hash = await bcrypt.hash(req.body.password, 10)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    date: Date.now()
  })

  try {
    const newUser = await user.save()
    res.status(201).json({
      message: 'User created!',
      result: newUser
    })
  } catch (err) {
    res.status(500).json({
      message:
        'Email aready in use. Please login or try again with a different email address.'
    })
  }
}

exports.userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(401).json({
        message: 'No user found with that email'
      })
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password)

    if (!isMatch) {
      return res.status(401).json({
        message: 'Incorrect password'
      })
    }

    const token = jwt.sign(
      { email: user.email, userId: user._id },
      keys.secret,
      { expiresIn: '12h' }
    )

    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: user._id,
      name: user.name
    })
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid authentication credentials'
    })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({
      _id: req.userData.userId
    })

    if (result.n > 0) {
      res.status(200).json({ message: 'Deletion successful!' })
    } else {
      res.status(401).json({ message: 'Unable to delete user' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Deleting trail failed!'
    })
  }
}
