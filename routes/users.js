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
module.exports = router;
