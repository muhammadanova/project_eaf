const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended : true }))
app.use(express.json())

const userRoute = require('./routes/index')
app.use('/',userRoute)


app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})