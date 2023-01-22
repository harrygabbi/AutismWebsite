var mysql = require('mysql2');
const path = require('path');
require('dotenv').config();
const templates = path.join(__dirname, "../templates/views")

var con = require('./db');
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

exports.view = (req, res) => {

        con.query("SELECT * FROM dailyExpenses where dateOfExpense = ?", [today], function (err, result, fields) {

            if (!err) {
                if(result.length > 0){
                res.render('dailyExpenses', { result })
                }
                else{
                    let result1 = {staffInfo : 1}
                    res.render('dailyExpenses', { result1 })
                }
            }
            else {
                console.log(err);
            }
        });
}

