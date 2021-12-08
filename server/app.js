const express = require("express");
const mysql = require("mysql");
var fs = require('fs');
var cors = require('cors');
var async = require('async');
var http = require('http');
const port = process.env.PORT || 8081;
const app = express();
var server = http.createServer(app);
const {google} = require("googleapis");
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
});

db.connect((err) => {
  if(err){
    console.log("database not connected");
  }
  console.log("database connected")
});

//create DB
app.get('/createdb', (req, res) => {
  let sql = "CREATE DATABASE inventory";
  db.query(sql , (err,  result) =>{
    if(err){
      console.log("database not created")
    }
    console.log(result);
    res.send("DATABASE CREATED")
  });
});

//create table
app.get("/createorderstable", (req, res) =>{
  let sql = "CREATE TABLE orders(id int AUTO_INCREMENT, title VARCHAR(225), body VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) =>{
    if(err) {
      throw err;
    }
    console.log(result);
    res.send("orders table created");
  });
});

//insert data
app.get("/addorder", (req, res) => {
  let order = {
    title : "order one",
    body: "test"
  };
  let sql = "INSERT INTO orders SET ?";
  let query = db.query(sql, order, (err, result) =>{
    if(err) {
      throw err;
    }
    console.log(result);
    res.send("order added");
  });
});

//select data
app.get("/getorders", (req, res) => {

  let sql = "SELECT * FROM orders";
  let query = db.query(sql, (err, result) =>{
    if(err) {
      throw err;
    }
    console.log(result);
    res.send("orders fetched");
  });
});


//select single order
app.get("/getorder/:id", (req, res) => {

  let sql = `SELECT * FROM orders WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) =>{
    if(err) {
      throw err;
    }
    console.log(result);
    res.send("order fetched");
  });
});

//select single order
app.get("/updateorder/:id", (req, res) => {
let newTitle = "updated title";
  let sql = `UPDATE orders SET title = "${newTitle}" WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) =>{
    if(err) {
      throw err;
    }
    console.log(result);
    res.send("order updated");
  });
});
// use it before all route definitions
app.use(cors({origin: '*'}));
app.use(express.static("../JSON",{etag: false})); // exposes index.html, per below

app.get("/getorders", async function(req,res){
  req.headers["mode"] = "no-cors";
  await require('./getUnfulfilledOrders').getOrders(sendResponse);
  function sendResponse(){
    res.send("orders fetched");
  }
});

app.get("/getdata", async function(req,res){
  req.headers["mode"] = "no-cors";
  await require('./getSheetData').getSheets(sendResponse);
  function sendResponse(){
    res.send("orders fetched")
  }
});
app.get("/filterdata", async function(req,res){
  req.headers["mode"] = "no-cors";
  await require('./newFiltering').filterMe(sendResponse);
  function sendResponse(){
    res.send("orders fetched")
  }
});
app.get("/markFulfilled", async function(req,res){
  req.headers["mode"] = "no-cors";
  await require('./fillLogs').fillLogs(
    req.query.fulfillingDate ,
    req.query.orderid,
    req.query.totalPrice,
    req.query.customer,
    req.query.destination,
    req.query.itemsSku,
    req.query.description,
    req.query.label,
    sendResponse);
  function sendResponse(){
    res.send("marked fulfilled")
  }
});
app.get('/updateData', async function(req,res){
  req.headers['mode'] = 'no-cors';
  await require('./testPrcel').setPostData(req.query.data, sendResponse);
  function sendResponse(){
    res.send({body: {
      response :global.sendleRes,
      label :global.shippingLabel,
      url : global.trackingUrl,
      trackingNo : global.trackingNo,    
     }
   })
  }
});
app.get("/fulfillSheets", async (req , res) =>{
  require('./setInventory').setSheets(JSON.parse(req.query.data));
  res.send("sheet updated");
});


app.get("/fulfillShopify", async (req , res) =>{
  await require('./shopifyFulfillment').shopifyFulfillment(req.query.orderid , req.query.trackingUrl,req.query.trackingNo, sendResponse);
  function sendResponse(){
    res.send({
      data : {
        response : global.shopifyRes
      }
    });
  }
});


server.listen(port,() => console.log(`running on ${port}`));
