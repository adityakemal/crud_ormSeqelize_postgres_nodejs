const models = require('../models')
var user = models.User



const control = {
  // READ
  read: (req, res) => {
    return user.findAll().then((data) => {
      res.status(200).send(data)
    })
  },
  // CREATE
  create: (req, res) => {
    user.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }).then((newUser) => {
      res.redirect('/')
      console.log(`new user ${newUser.firstName} has created with id ${newUser.id}`);
    })
  },
  // UPDATE
  update: (req,res)=>{
    const id = req.params.id
    user.findOne({
      where : {id:id}
    })
    .then((data)=>{
      data === null ? res.send({message :'data kosong'}) :
        befUp = data.firstName
        data.update({
        firstName: req.body.firstName || data.firstName,
        lastName: req.body.lastName || data.lastName,
        email: req.body.email || data.email
      })
      .then((infoUp)=>{
        console.log(`nama anda telah berubah dari ${befUp} menjadi ${infoUp.firstName}`);
        res.redirect('/')

      })
    })
  },
  // DELETE
  destroy: (req,res)=>{
    const id = req.params.id
    user.destroy({
      where:{id: id}
    }).then(()=>{
      res.redirect('/')
    })
  },

}



module.exports = control
