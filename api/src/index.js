require('dotenv').config()

// Requires
const express = require('express')
const cors = require('cors')
const session = require('express-session');
const router = require('../routes')
const mongoose = require('mongoose')
const startServiceCron = require("../crons/cron")
const bodyParser = require('body-parser')

// App
const app = express()

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.JWT_SECRET
}));

// Cors
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  })
)

// Middleware
app.use(bodyParser.json({limit: '50mb'}))

// api routes
app.use('/api', router)

app.listen(process.env.PORT_APP, async () => {
    try{
        await mongoose.connect(process.env.MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
      })
      startServiceCron()
      console.log(`App has been started on port: ${process.env.PORT_APP}`)
    }catch(_){
        console.log("Error connect database")
    }
})