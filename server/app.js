if (!process.env.NODE_ENV || process.env.NODE_ENV == "development") {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.urlencoded({ extended : true }))
app.use(express.json())
app.use('/', routes)

const userRoute = require('./routes/index')
app.use('/',userRoute)

app.use(errorHandler.client)
app.use(errorHandler.server)

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})