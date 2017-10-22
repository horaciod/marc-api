var express = require('express');
var router = express.Router();
const {client} = require('../src/basededatos.js')
;
        var marcjs = require('marcjs');
var marc4js = require('marc4js');
var fs = require('fs');
var marcrecord = require('marcrecord');


router.get('/list', function (req, res, next) {



    client.query('SELECT  identificador , jmarc->>\'title\' as titulo from \
 biblio.catalogo where idcoleccion=52 order by identificador limit 10 offset 100 ', (err, resp) => {
        // console.log(err, res) ;
        var regs = resp.rows;

        res.render('listacatalogo', {title: 'Catálogo lista', regs: regs});


    })
});


router.get('/get/:identificador', function (req, res, next) {
    if (req.params['identificador'] != undefined) {
        console.log(req.params);

        client.query('SELECT  identificador , marcxml ,jmarc->>\'title\' as titulo from \
 biblio.catalogo where identificador=\'' + req.params['identificador'] + '\' ', (err, resp) => {
            // console.log(err, res) ;
            var regs = resp.rows;
            var marcxml = resp.rows[0].marcxml;
            //          console.log(marcxml);
            leermarc(marcxml);
            res.render('fichacatalogo', {title: 'Catálogo ficha ', regs: regs});


        })
    } else {
        res.render('errorcat', {});

    }
});

module.exports = router;

function leer(marcxml) {
    marc4js.parse(marcxml, {fromFormat: 'marcxml'}, function (err, records) {
        console.log(records.length);
        var r = records[0];
        console.log(r.getVariableField('245'));


        console.log(r);
    });

}
function leermarc(marcxml) {
    fs.writeFile('/tmp/marc.xml', marcxml, (err) => {
        if (err)
            throw err;
        else {
            console.log('The file has been saved!');
            leerarchivo();
        }
    });

}

function leerarchivo() {
    var registros = new marcrecord.MarcXmlReader();
    registros.openSync('/tmp/marc.xml', {format: 'MARC21'});

    record = registros.nextSync();
    console.log(registros);
    var campo =  record.getVariableField('245');
    console.log(campo.getSubfield('a').data); 

}

function leerold(marcxml) {
    var reader = new marcjs.MarcxmlReader(fs.createReadStream('marc.xml'));
    console.log('xxxx');
    reader.on('data', function (record) {
        record.append(
                ['998', '  ', 'a', 'Demians', 'b', 'Frédéric'],
                ['999', '  ', 'a', 'Demians Pauline']
                );
        console.log(record.as('text'));
    });

//    var record = new marcjs.Record(new marcjs.JsonWriter._write());
//    record.parse(marcxml) ; 
    console.log(record.as('text'));


}