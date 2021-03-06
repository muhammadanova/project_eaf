const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
  static login(req, res, next){
    User.findOne({ where: { email: req.body.email } })
    .then(user => {
        if (!user) {
            next({ statusCode: 404, message: "email or password incorect" })
        } else {
            const match = bcrypt.compareSync(req.body.password, user.password)
            if (!match) {
                next({ statusCode: 400, message: "email or password incorect" })
            } else {
                const token = jwt.sign({ id: user.id }, "keyeryn")
                //process.env.JWT_SECRET
                req.headers.token = token
                res.status(200).json({ user, token })
            }
        }
    })
    .catch(err => {
        next(err)
    })
  }

  static register(req, res, next) {
    const userObj = {
            username:req.body.username,
            email: req.body.email,
            password: req.body.password
           }
    User.create(userObj)
      .then(user => {
          res.status(200).json(user)
      })
      .catch(err => {
          next(err)
      })
  }

  static googleSignIn(req, res, next) {
      client.verifyIdToken({
          idToken: req.body.id_token,
          audience:"192853845247-5m7nfo0olp0shku4js9inkkquh3plt9o.apps.googleusercontent.com"
        })
        .then(ticket => {
            let payload = ticket.getPayload()
            User.findOne({where:{email:payload.email}})
            .then(user => {
            if(user) {
                const token = jwt.sign({ id: user.id }, "keyeryn")
                console.log(token)
                res.status(200).json({token})
            } else {
                User.create({
                    email: payload.email,
                    password: "coba pasword"
                })
                .then(user => {
                    const token = jwt.sign({ id: user.id }, "keyeryn")
                    res.status(201).json({token})
                })
            }
        })
        .catch(err => {
            next(err)
        })
      })
    }
}
module.exports = UserController