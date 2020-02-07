const { Plan } = require('../models')
console.log(Plan)
class PlanController {

  // Find All data
  static planList(req,res,next){
    Plan.findAll({
      order: [['id', 'DESC']]
    })
    .then(allplan=>{
      res.status(200).json(allplan)
    })
    .catch(err=>{
      next(err)
    })
  }


  // Add New Plan
  static addPlan(req,res,next){
    let dataPlan = {
      title : req.body.title,
      province : req.body.province,
      city : req.body.city ,
      date_plan: req.body.date_plan,
      itinerary: req.body.itinerary,
      transportation: req.body.transportation,
      equipment: "nanti",
      budget: req.body.budget,
      UserId: req.user.id
    }
    console.log(dataPlan)

    Plan.create(dataPlan)
    .then(result=>{
      res.status(201).json(result)
    })
    .catch(err=>{
      next(err)
    })

  }

  // Find One Plan
  static findOne(req,res,next){
    Plan.findByPk(req.params.id)
    .then(result=>{
      res.status(200).json(result)
    })
    .catch(err=>{
      next(err)
    })
  }


  // Edit Plan
  static editPlan(req,res,next){
    
    let dataPlan = {
      title: req.body.title,
      province : req.body.province,
      city : req.body.city ,
      date_plan: new Date(req.body.date_plan),
      itinerary: req.body.itinerary,
      transportation: req.body.transportation,
      equipment: req.body.equipment || "no equipment",
      budget: req.body.budget
    }
    console.log("data plan:", dataPlan)

    Plan.update(dataPlan, {
      where: {id : req.params.id },
      returning : true
    })
    .then(edited=>{
      res.status(200).json(edited[1])
    })
    .catch(err=>{
      next(err)
    })
  }


  // Delete Plan
  static deletePlan(req,res,next){
    let dataDelete ={}
    Plan.findOne({
      where : {id : req.params.id}
    })
    .then(result=>{
      dataDelete = result
      return Plan.destroy({
        where: {id : req.params.id }
      })
    })
    .then(()=>{
      res.status(200).json(dataDelete)
    })
    .catch(err=>{
      next(err)
    })
  }

}

module.exports = PlanController