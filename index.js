// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require("dotenv").config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  if(req.params.date == null){
    res.json({unix:Date.parse(Date()), utc:Date()})
  }
  const date = Date.parse(req.params.date);
  if(isNaN(date)){
    const utc = new Date(req.params.date/1000)
    if(utc!="Invalid Date")
      res.json({unix:date,utc:utc.toUTCString()})
    else
      res.json({ error : "Invalid Date"})

  }else{
    const utc = new Date(date).toUTCString();
    res.json({unix:date,utc:utc})
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
