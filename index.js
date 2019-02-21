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
var user = models.User

//read
app.get("/", (req, res) => {
  user.findAll().then((data)=>{
    res.send(data)
    // console.log(data);
  })
})
//create
app.post("/user", (req, res) => {
  user.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  }).then((newUser)=>{
    res.redirect('/')
    console.log(`new user ${newUser.firstName} has created with id ${newUser.id}`);
  })

})

//update
app.post('/update/:id', (req,res)=>{
  const id = req.params.id
  user.findOne({
    where : {id:id}
  })
  .then((data)=>{
    const befUp = data.firstName
      data.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    })
    .then((infoUp)=>{
      console.log(`nama anda telah berubah dari ${befUp} menjadi ${infoUp.firstName}`);
      res.redirect('/')

    })
  })
})


//delete
app.get("/delete/:id",(req,res)=>{
  const id = req.params.id
  user.destroy({
    where:{id: id}
  }).then(()=>{
    res.redirect('/')
  })
})


var port = "3000"
app.listen(port, () => console.log('running in port', port))
