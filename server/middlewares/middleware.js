const jwt = require('jsonwebtoken')
exports.authentiocation = function (req, res, next) {
  try{
    console.log(req.headers.token)
    const token = req.headers.token
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } 
  catch (error) {
    next({code:401, message:"invalid token"})
  }
}


exports.authorisation = function(req, res, next){
let stringId = req.user.id.toString()
  Todo.findOne({where:{id:req.params.id}})
  .then(todo=> {
    if(todo.UserId == stringId){
      next()
    } else {
      next({code:401, message:"you are not allowed to do this task"})
    }
  })
  .catch(err => {
      next({code:401, message:"invalid user"})
  })
}