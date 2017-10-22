var express = require('express');
var router = express.Router();
const {client} = require('../src/basededatos.js') ; 

router.get('/list', function(req, res, next) {
  

client.query('SELECT  idusuario , login, idbiblioteca from \n\
 biblio.usuarios order by idusuario,login', (err, resp) => {
 // console.log(err, res) ;
 var usuarios = resp.rows ; 
 console.log(typeof  usuarios ) ; 
res.render('usuarios', {title:'Usuarios' , usuarios:usuarios});
 
    
}) 
});
router.get('/get/:id', function(req, res, next) {
  var id = req.params['id'];

client.query('SELECT  idusuario , login, idbiblioteca from \n\
 biblio.usuarios where idusuario='+id, (err, resp) => {
 // console.log(err, res) ;
 var usuarios = resp.rows ; 
 res.send(usuarios) ; 
    
}) 
});
module.exports = router;
