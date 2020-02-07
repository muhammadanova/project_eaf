const { Plan } = require('../models')
const { User } = require('../models')
const sendMail = require('../helpers/sendGrid').sendMail
class PlanController {

  // Find All data
  static planList(req,res,next){
   
    Plan.findAll()
    .then(allplan=>{
      // console.log(allplan)
      if(allplan.length>0){
        res.status(200).json(allplan)
      }else{
        console.log('kosong')
        res.status(204).json({message: 'data is empty'})
      }
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
      equipment: req.body.equipment,
      budget: req.body.budget,
      UserId:req.user.id
    }
    let user
    let plan
    User.findOne({where:{id:dataPlan.UserId}})
    .then(result => {
      user = result
      return Plan.create(dataPlan)
    })
    .then(result=>{
      plan = result
      sendMail(user.dataValues, plan.dataValues)
      res.status(201).json(plan.dataValues)
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
  static  editPlan(req,res,next){
    let dataPlan = {
      province : req.body.province,
      city : req.body.city ,
      date_plan: req.body.date_plan,
      itinerary: req.body.itinerary,
      transportation: req.body.transportation,
      equipment: req.body.equipment,
      budget: req.body.budget
    }

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