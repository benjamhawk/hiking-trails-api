const express = require('express')
const TrailsController = require('../controllers/trails')

const checkAuth = require('../middlewares/check-auth')

const router = express.Router()

router.get('', TrailsController.getTrails)

router.get('/myTrails', checkAuth, TrailsController.getMyTrails)

router.get('/:id', TrailsController.getTrail)

router.get('/coordinates/:city/:state', TrailsController.getCoords)

router.post('', checkAuth, TrailsController.createTrail)

router.put('/:id', checkAuth, TrailsController.updateTrail)

router.delete('/:id', checkAuth, TrailsController.deleteTrail)

router.delete('/byName/:name', checkAuth, TrailsController.deleteTrailByName)

module.exports = router
