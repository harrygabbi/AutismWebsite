var mysql = require('mysql2');
const path = require('path');
require('dotenv').config();
const templates = path.join(__dirname , "../templates/views")

var con = require('./db');

exports.view = (req, res) => {

        con.query("SELECT firstName FROM clientInfo", function (err, result, fields) {

        if(!err){
            res.render('childAttandance', { result })
        }
        else{
            console.log(err);
        }
    });
}

