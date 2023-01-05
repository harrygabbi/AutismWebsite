var mysql = require('mysql2');



// var con = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });
var con = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6588369",
    password: "dtQ5iD5mXx",
    database: "josql6588369ke"
});
con.connect(function(err) {
    if (err) throw err;
});

module.exports = con;