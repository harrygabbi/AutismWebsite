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


var mysql = require('mysql2');

// var insertIntoTable = async () =>{
//   const connection = await mysql.createConnection({
//     host: "sql9.freesqldatabase.com",
//     user: "sql9586518",
//     password: "uLQmfLtQPj",
//     database: "sql9586518",
//     port: 3306
//   })

//   try {
//     await connection.query(
//       "INSERT INTO sample VALUES (1, 'HARRY')"
//     )
//     console.log("inserted");

//   } catch (error) {
//     console.log(error);
//   }
// }
// var insertIntoTable = async () =>{
//   const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "2003harry",
//     database: "joke",
//     port: 3306
//   })

//   try {
//     connection.query(
//       "INSERT INTO sample2 VALUES (1, 1)"
//     )
//     console.log("inserted");
//   } catch (error) {
//     console.log(error);
//   }
//   connection.query("SELECT * FROM sample", function (err, result, fields) {
//     if(!err){
//       console.log(result);
//     }
//     else{
//         console.log(err);
//     }});
// }
// insertIntoTable();

// var con = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: "root",
//   password: "2003harry",
//   database: process.env.DB_NAME
// });

var con = mysql.createConnection({
  host: "sql9.freesqldatabase.com",
  user: "sql9586518",
  password: "uLQmfLtQPj",
  database: "sql9586518",
  port: 3306
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});




//routing
// app.get( path , callback )
app.get("/", (req, res) => {
    res.render("index");
})
app.get("/login", (req, res) => {
    res.render("login");
})
app.get("/admin", (req, res) => {
    res.render("admin");
})
app.get("/promoter", (req, res) => {
    res.render("promoter");
})
app.get("/adminPanel", (req, res) => {
    res.render("adminPanel");
})
app.get("/promoterPanel", (req, res) => {
    res.render("promoterPanel");
})
app.get("/consultationForm", (req, res) => {
    res.render("consultationForm");
})
app.get("/dailyEntryForm", (req, res) => {
  res.render("dailyEntryForm");
})
app.get("/newAdmissionForm", (req, res) => {
  res.render("newAdmissionForm");
})

  

const staffAttandance = require('./modules/user');
app.get("/staffAttandance", staffAttandance);

const childAttandance = require('./modules/childAttandance');
app.get("/childAttandance", childAttandance);

const expensesRecord = require('./modules/expensesRecord');
app.get("/expensesRecord", expensesRecord);

const staffList = require('./modules/staffList');
app.get("/staffInfo", staffList);

const clientList = require('./modules/clientList');
app.get("/clientList", clientList);

const dailyExpenses = require('./modules/dailyExpenses');
app.get("/dailyExpenses", dailyExpenses);

const seeStaffAttandance = require('./modules/seeStaffAttandance');
app.get("/seeStaffAttandance", seeStaffAttandance);

const seeClientAttandance = require('./modules/seeClientAttandance');
app.get("/seeClientAttandance", seeClientAttandance);



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


app.post("/adminPanel", async (req, res) => {
    let username = req.body.name;
    let password = req.body.password;
    con.query("select * from adminLogin where username = ? and password = ?", [username, password], function (error, results, fields) {

        if (results.length > 0) {
            res.redirect("/adminPanel");
        }
        else {
            res.redirect("/")
        }
    })
})

app.post("/promoterPanel", async (req, res) => {
    let username = req.body.name;
    let password = req.body.password;
    con.query("select * from promoterLogin where username = ? and password = ?", [username, password], function (error, results, fields) {

        if (results.length > 0) {
            res.redirect("/promoterPanel");
        }
        else {
            res.redirect("/")
        }
    })
})

app.post("/markAttandance", async (req, res) => {
    let username = req.body.Name;
    let date = req.body.date;

    con.query("insert into attandance values (?,?,1)", [username, date], function (error, results, fields) {
        if (results.length > 0) {
            alert("Attandance added");
        }
        else {
            res.redirect("/")
        }
    })

})

app.post("/dailyExpenses", async (req, res) => {
    let date = req.body.date;

    con.query("SELECT * FROM dailyExpenses where dateOfExpense = ?", [date], function (err, result, fields) {

        if(!err){
            res.render('dailyExpenses', { result })
        }
        else{
            console.log(err);
        }
    });

})

app.post("/seeStaffAttandance", async (req, res) => {
    let date = req.body.date;

    con.query("SELECT * FROM staffAttandance where dateOfPresent = ?", [date], function (err, result, fields) {

        if(!err){
            res.render('seeStaffAttandance', { result })
        }
        else{
            console.log(err);
        }
    });

})

app.post("/consultationFormSubmit", async (req, res) => {
  let Name = req.body.Name;
  let age = req.body.age;
  let contactNumber = req.body.contactNumber;
  let Address = req.body.address;
  let Reference = req.body.reference;

  con.query("insert into consultationForms (Name, Age, contactNumber, Address, Reference) values (?,?,?,?,?)", [Name, age, contactNumber, Address, Reference], function (error, results, fields) {
      if (results.length > 0) {

      }
      else {
        con.query("select min(uniqueID) as uniqueID from  consultationForms", function (err, result, fields) {

          if(!err){
              res.render('consultationForm.hbs', { result })
          }
          else{
              console.log(err);
          }
        });
      }
  })

})

//server create
app.listen(port, () => {
    console.log(`The server is running at ${port}`);
})