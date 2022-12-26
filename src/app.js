const express = require('express');
require("./db/conn")
// require('dotnev').config();
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const hbs = require('hbs');

const staticpath = path.join(__dirname, "../public")
const templates = path.join(__dirname, "../templates/views")
const partialpath = path.join(__dirname, "../templates/partials")
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")))
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")))
app.use("/jq", express.static(path.join(__dirname, "../node_modules/jquery/dist")))
app.use(express.urlencoded())
app.use(express.static(staticpath))

app.set("view engine", "hbs")
app.set("views", templates);
hbs.registerPartials(partialpath);


var mysql = require('mysql2/promise');

var insertIntoTable = async () =>{
  const connection = await mysql.createConnection({
    host: "sql9.freesqldatabase.com",
    user: "sql9586518",
    password: "uLQmfLtQPj",
    database: "sql9586518",
    port: 3306
  })

  try {
    await connection.query(
      "INSERT INTO sample VALUES (1, 'HARRY')"
    )
    console.log("inserted");

  } catch (error) {
    console.log(error);
  }
}
insertIntoTable();

// var con = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: "root",
//   password: "2003harry",
//   database: process.env.DB_NAME
// });

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",k
//   password: "2003harry",
//   database: "joke"
// });


// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });




//routing
// app.get( path , callback )
app.get("/", (req, res) => {
    res.render("index");
})
// app.get("/login", (req, res) => {
//     res.render("login");
// })
// app.get("/admin", (req, res) => {
//     res.render("admin");
// })
// app.get("/adminPanel", (req, res) => {
//     res.render("adminPanel");
// })
// app.get("/consultationForm", (req, res) => {
//     res.render("consultationForm");
// })

// const staffAttandance = require('./modules/user');
// app.get("/staffAttandance", staffAttandance);

// const childAttandance = require('./modules/childAttandance');
// app.get("/childAttandance", childAttandance);

// const expensesRecord = require('./modules/expensesRecord');
// app.get("/expensesRecord", expensesRecord);

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "2003harry",
//     database: "joke"
// });
// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });


// app.post("/index", async (req, res) => {
//     let username = req.body.name;
//     let password = req.body.password;
//     con.query("select * from Login where email = ? and userpassword = ?", [username, password], function (error, results, fields) {
//         if (results.length > 0) {
//             res.redirect("/adminPanel");
//         }
//         else {
//             res.redirect("/")
//         }
//     })
// })

// app.post("/markAttandance", async (req, res) => {
//     let username = req.body.Name;
//     let date = req.body.date;

//     con.query("insert into attandance values (?,?,1)", [username, date], function (error, results, fields) {
//         if (results.length > 0) {
//             alert("Attandance added");
//         }
//         else {
//             res.redirect("/")
//         }
//     })

// })

//server create
app.listen(port, () => {
    console.log(`The server is running at ${port}`);
})