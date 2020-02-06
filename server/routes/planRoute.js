const express = require('express')
const router = express.Router()
const PlanController = require('../controllers/PlanController')

router.get('/plan', PlanController.planList)
router.post('/plan', PlanController.addPlan)

router.get('/plan/:id',PlanController.findOne)
router.put('/plan/:id', PlanController.editPlan)
router.delete('/plan/:id', PlanController.deletePlan)

module.exports = router