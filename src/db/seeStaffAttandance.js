var mysql = require('mysql2');
const path = require('path');
const templates = path.join(__dirname , "../templates/views")

var con = require('./db');

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;


exports.view = (req, res) => {

        con.query("SELECT * FROM staffAttandance where dateOfPresent = ?", [today], function (err, result, fields){

        if(!err){
            if(result.length > 0){
                res.render('seeStaffAttandance', { result })
                }
                else{
                    let result1 = {staffInfo : 1}
                    res.render('seeStaffAttandance', { result1 })
                }
        }
        else{
            console.log(err);
        }
    });
}

