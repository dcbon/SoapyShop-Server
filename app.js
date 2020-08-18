require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const errHandler = require('./middlewares/errHandler')
const cors = require('cors')


app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.json())
app.use(routes)
app.use(errHandler)

if (process.env.NODE_ENV != 'test') {
  const server = app.listen(port, () => {
  // console.log(`Listening at http://localhost:${port}`)
  })
}


module.exports = app