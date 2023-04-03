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
app.get("/api/:date?", function(req, res) {
  const date = req.params.date
  if (date == null) {
    res.json({ unix: Date.parse(Date()), utc: Date() })
  }
  const timeStamp = Date.parse(date);
  if (isNaN(timeStamp)) {
    const utc = new Date(parseInt(date))
    if (utc != "Invalid Date")
      res.json({ unix: parseInt(date), utc: utc.toUTCString() })
    else
      res.json({ error: "Invalid Date" })
  } else {
    const utc = new Date(timeStamp).toUTCString();
    res.json({ unix: timeStamp, utc: utc })
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
