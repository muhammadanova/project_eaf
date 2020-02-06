const express = require('express')
const router = express.Router()
const PlanController = require('../controllers/PlanController')
const middleware = require('../middlewares/middleware')


router.get('/plan', middleware.authentication,PlanController.planList)
router.post('/plan', middleware.authentication ,PlanController.addPlan)

router.get('/plan/:id',middleware.authentication, middleware.authorisation,PlanController.findOne)
router.put('/plan/:id',middleware.authentication, middleware.authorisation, PlanController.editPlan)
router.delete('/plan/:id', middleware.authentication, middleware.authorisation,PlanController.deletePlan)

module.exports = router