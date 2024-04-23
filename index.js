// loads .env file connects into process.env by default
require('dotenv').config()

// import express
const express = require('express')

// import cors
const cors = require('cors')

const db = require('./DB/connection')

const router = require(`./Routes/router`)

const appMiddleware = require('./Middlewares/appMiddleware')

// create a backend application using express
const qqServer = express() // Creates an express application

// use cors
qqServer.use(cors())
qqServer.use(express.json()) // Returns middleware that only parses json
qqServer.use(appMiddleware)
qqServer.use(router)

qqServer.use('/uploads', express.static('./uploads')) //image exporting to frontend

// port creation
const PORT = 4000 || process.env.PORT

// server listening
qqServer.listen(PORT, () => {
    console.log("Listening on port " + PORT);
})

// localhost:4000 -> res qqServer is started...
qqServer.get('/', (req, res) => {
    res.send(`<h1>Quiz Quest Server Started</h1>`)
})