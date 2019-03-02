const express = require('express')
const pg = require('pg')
const models = require('./models')
const bodyParser = require('body-parser')
// var sequelize = require('sequelize');
// parse application/x-www-form-urlencoded
var app = express()
//////////////
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

/////////////////////////////here
// var user = models.User
// IMPORT MODULE CONTROLLERS
var control = require('./controllers/controllerIndex.js')

//read
app.get("/", control.read)
//create
app.post("/user", control.create)

//update
app.put('/update/:id', control.update)

//delete
app.delete("/delete/:id",control.destroy)


var port = "3000"
app.listen(port, () => console.log('running in port', port))
