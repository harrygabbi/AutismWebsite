const express = require('express');
require("./db/conn")
require('dotenv').config();

const cookie = require('cookie-parser')
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
app.use(express.json())

app.set("view engine", "hbs")
app.set("views", templates);
hbs.registerPartials(partialpath);
app.use(cookie())

var mysql = require('mysql2');



var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// var con = mysql.createConnection({
//   host: "sql6.freesqldatabase.com",
//   user: "sql6588369",
//   password: "dtQ5iD5mXx",
//   database: "sql6588369"
// });


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
app.get("/addStaff", (req, res) => {
    res.render("addStaff");
})
app.get("/newPassword", (req, res) => {
    res.render("newPassword");
})
app.get("/gallery", (req, res) => {
    res.render("gallery");
})



const changePassword = require('./modules/changePassword');
app.get("/changePassword", changePassword);

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

const newAdmission = require('./modules/newAdmissionForm');
app.get("/newAdmissionForm", newAdmission);



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
    con.query("select * from adminLogin where username = ? and userPassword = ?", [username, password], function (error, results, fields) {

        if (results.length > 0) {
            res.redirect("/adminPanel");
        }
        else {
            results = {staffInfo : 1}
            res.render("admin", {results})
        }
    })
})

app.post("/promoterPanel", async (req, res) => {
    let username = req.body.name;
    let password = req.body.password;
    con.query("select * from promoterLogin where username = ? and userPassword = ?", [username, password], function (error, results, fields) {
        console.log(username + ": " + password);
        if (results.length > 0) {
            res.redirect("/promoterPanel");
        }
        else {
            results = {username: username}
            res.render("promoter", {results});
        }
    })
})

app.post("/markAttandance", async (req, res) => {
    let username = req.body.staffid;
    let date = req.body.date;

    con.query("SELECT * FROM staffInfo where staffID = ?", [username ,date], function (error, results1, fields) {
        if(results1.length > 0){
            con.query("SELECT * FROM staffAttandance where staffID = ? and dateOfPresent = ?", [username ,date], function (error, results, fields) {
                if(results.length <= 0){
                    con.query("insert into staffAttandance values (?,?,'yes')", [username, date], function (error, resul, fields) {
                        if (resul.length > 0) {
                            alert("Attandance added");
                        }
                        else {
                            resul = {staffID : username}
                            console.log("attandance was marked")
                            res.render("staffAttandance", {resul})
                        }
                    })
                }
                else{
                    res.render('staffAttandance', { results })
                }
            })
            
        }
        else{

            results1 = {staffID: 1}

            res.render('staffAttandance', { results1 })

        }
    })


    

})

app.post("/clientAttandance", async (req, res) => {
    let username = req.body.uniqueid;
    let date = req.body.date;
    con.query("SELECT * FROM clientInfo where uniqueID = ?", [username ,date], function (error, results1, fields) {
        if(results1.length > 0){
            con.query("SELECT * FROM clientAttandance where uniqueID = ? and dateOfSession = ?", [username ,date], function (error, results, fields) {
                if(results.length <= 0){
                    con.query("insert into clientAttandance values (?,?,'yes',?,?)", [username, date,date,date], function (error, resul, fields) {
                        if (resul.length > 0) {
                            alert("Attandance added");
                        }
                        else {
                            resul = {staffID : username}
                            console.log("attandance was marked")
                            res.render("childAttandance", {resul})
                        }
                    })
                }
                else{
                    res.render('childAttandance', { results })
                }
            })
            
        }
        else{

            results1 = {staffID: 1}

            res.render('childAttandance', { results1 })

        }
    })

})

app.post("/addExpenses", async (req, res) => {
    let purpose = req.body.purpose;
    let cost = req.body.cost;
    let date = req.body.date;
    console.log(req.body);
    con.query("insert into dailyExpenses (cost,purpose,dateOfExpense) values (?,?,?);", [cost, purpose, date], function (error, results, fields) {
        if (results.length > 0) {
            alert("Attandance added");
        }
        else {
            console.log("expensesRecord");
            res.redirect('expensesRecord');
        }
    })

})

app.post("/dailyExpenses", async (req, res) => {
    let date = req.body.date;

    con.query("SELECT * FROM dailyExpenses where dateOfExpense = ?", [date], function (err, result, fields) {

        if(!err){
            
            if(result.length > 0){
                res.render('dailyExpenses', { result })
                }
                else{
                    let result1 = {staffInfo : 1}
                    res.render('dailyExpenses', { result1 })
                }
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

})
app.post("/seeClientAttandance", async (req, res) => {
    let date = req.body.date;

    con.query("SELECT * FROM clientAttandance where dateOfSession = ?", [date], function (err, result, fields) {

        if(!err){
            if(result.length > 0){
                res.render('seeClientAttandance', { result })
            }
            else{
                let result1 = {staffInfo : 1}
                res.render('seeClientAttandance', { result1 })
            }
        }
        else{
            console.log(err);
        }
    });

})

app.post("/changePassword", async (req, res) => {
    const answer = req.body.answer;
    con.query("select securityAnswer from promoterLogin", function (error, results, fields) {


        if(answer === results[0]['securityAnswer']){
            res.redirect('newPassword');
        }
        else{
            res.redirect('/');
        }
    })
})

app.post("/newPassword", async (req, res) => {
    const answer = req.body.answer;
    con.query("update promoterLogin set userPassword = ? where username = 'promoter';", [answer],function (error, results) {
        if(error){
            console.log(error);
        }
        else{
            if(results.affectedRows > 0){
                res.redirect('promoter');
            }
        }
    })
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
        con.query("select max(uniqueID) as uniqueID from  consultationForms", function (err, result, fields) {

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
app.post("/newAdmission", async (req, res) => {
    
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    const age = req.body.age;
    const package = req.body.package;
    const mode = req.body.mode;

    con.query("insert into clientInfo (firstName, lastName, email, phoneNumber,age,  address, package, modeOfPayment) values (?,?,?,?,?,?,?,?)", [firstName, lastName, email, phoneNumber,age, address, package, mode], function (error, results, fields) {
        if (results.length > 0) {
  
        }
        else {
          con.query("select max(uniqueID) as uniqueID from  clientInfo", function (err, res1, fields) {
  
            if(!err){
                res.render('newAdmissionForm.hbs', { res1 })
            }
            else{
                console.log(err);
            }
          });
        }
    })
  })

app.post("/addingStaff", async (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    const age = req.body.age;
    const workType = req.body.workType;

    con.query("insert into staffInfo (firstName, lastName, email, phoneNumber, address, age, workType) values (?,?,?,?,?,?,?)", [firstName, lastName, email, phoneNumber, address, age, workType], function (error, results, fields) {
        if (results.length > 0) {
  
        }
        else {
          con.query("select max(staffID) as staffID from  staffInfo", function (err, result, fields) {
  
            if(!err){
                res.render('addStaff.hbs', { result })
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


//pemoyi9286@prolug.com