const express = require('express')
const router = express.Router()

// Home Page
router.get('/', (req, res) => res.send('Home'))

module.exports = router
