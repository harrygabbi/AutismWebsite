var mysql = require('mysql2');
const path = require('path');
const templates = path.join(__dirname , "../templates/views")

var con = require('./db');

exports.view = (req, res) => {

        con.query("SELECT * FROM clientInfo", function (err, result, fields) {

        if(!err){
            res.render('clientInfo', { result })
        }
        else{
            console.log(err);
        }
    });
}

