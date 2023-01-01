var mysql = require('mysql2');
const path = require('path');
const templates = path.join(__dirname , "../templates/views")

var con = mysql.createConnection({
  host: "sql9.freesqldatabase.com",
  user: "sql9586518",
  password: "uLQmfLtQPj",
  database: "sql9586518"
});


exports.view = (req, res) => {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        con.query("SELECT * FROM clientInfo", function (err, result, fields) {

        if(!err){
            res.render('clientInfo', { result })
        }
        else{
            console.log(err);
        }
    });
    });
}

