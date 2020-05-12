const express = require('express')
const TrailsController = require('../controllers/trails')

const checkAuth = require('../middlewares/check-auth')

const router = express.Router()

router.post('', checkAuth, TrailsController.createTrail)
router.get('', checkAuth, TrailsController.getTrails)
router.get('/:id', TrailsController.getTrail)

module.exports = router
