const express = require("express");
var fs = require('fs');
var cors = require('cors');
var async = require('async');
var http = require('http');
const port = process.env.PORT || 8081;
const app = express();
var server = http.createServer(app);
const {google} = require("googleapis");
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
