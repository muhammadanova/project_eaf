const express = require('express')
const router = express.Router()
const userRoute = require('./userRoute')
const planRoute = require('./planRoute')

router.use('/', userRoute)
router.use('/', planRoute)

module.exports = router