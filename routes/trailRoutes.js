const express = require('express')
const TrailsController = require('../controllers/trails')

const checkAuth = require('../middlewares/check-auth')

const router = express.Router()

router.get('', checkAuth, TrailsController.getTrails)

router.get('/:id', TrailsController.getTrail)

router.post('', checkAuth, TrailsController.createTrail)

router.put('/:id', checkAuth, TrailsController.updateTrail)

router.delete('/:id', checkAuth, TrailsController.deleteTrail)

module.exports = router
