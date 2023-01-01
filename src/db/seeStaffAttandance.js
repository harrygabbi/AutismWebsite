var mysql = require('mysql2');
const path = require('path');
const templates = path.join(__dirname , "../templates/views")

var con = mysql.createConnection({
  host: "sql9.freesqldatabase.com",
  user: "sql9586518",
  password: "uLQmfLtQPj",
  database: "sql9586518"
});

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;


exports.view = (req, res) => {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        con.query("SELECT * FROM staffAttandance where dateOfPresent = ?", [today], function (err, result, fields){

        if(!err){
            res.render('seeStaffAttandance', { result })
            console.log(result);
        }
        else{
            console.log(err);
        }
    });
    });
}

