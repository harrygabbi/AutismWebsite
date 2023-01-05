var mysql = require('mysql2');
const path = require('path');
const templates = path.join(__dirname , "../templates/views")

var con = require('./db');


exports.view = (req, res) => {

        con.query("SELECT purpose FROM dailyExpenses", function (err, result, fields) {

        if(!err){
            res.render('expensesRecord', { result })
        }
        else{
            console.log(err);
        }
    });
}

