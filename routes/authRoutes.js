const express = require('express')
const UserController = require('../controllers/user')
const checkAuth = require('../middlewares/check-auth')

const router = express.Router()

router.post('/register', UserController.createUser)
router.post('/login', UserController.userLogin)
router.delete('/user', checkAuth, UserController.deleteUser)

module.exports = router
