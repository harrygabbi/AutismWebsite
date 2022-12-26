// var mysql = require('mysql2');
// const path = require('path');
// const templates = path.join(__dirname , "../templates/views")

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "2003harry",
//   database: "joke"
// });


exports.view = (req, res) => {
    // con.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");

    //     con.query("SELECT Name FROM Login", function (err, result, fields) {

    //     if(!err){
    //         res.render('childAttandance', { result })
    //     }
    //     else{
    //         console.log(err);
    //     }
    // });
    // });
    res.render('childAttandance');
}

