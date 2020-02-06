const jwt = require('jsonwebtoken')
const { Plan } = require('../models')
exports.authentication = function (req, res, next) {
  try{
    console.log(req.headers.token)
    const token = req.headers.token
    const user = jwt.verify(token, "keyeryn")
    //process.env.JWT_SECRET
    req.user = user
    next()
  } 
  catch (error) {
    next({code:401, message:"invalid token"})
  }
}


exports.authorisation = function(req, res, next){
let stringId = req.user.id.toString()
  Plan.findOne({where: {id:req.params.id}})
  .then(plan=> {
    if(plan.UserId == stringId){
      next()
    } else {
      next({code:401, message:"you are not allowed"})
    }
  })
  .catch(err => {
      next({code:401, message:"invalid user"})
  })
}