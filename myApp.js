let path = require('path');
let express = require('express');
let app = express();

process.env.MESSAGE_STYLE = "uppercase"

app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(path.join(__dirname, 'public')));

var loggerMidleware = (req, res, next) => {

  let ClientIp = req.ip;
  let path = req.path;
  let method = req.method;

  console.log(method + " " + path + " - " + ClientIp);
  next();
}
app.use(loggerMidleware);

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get("/json", (req, res) => {
  let xjson = { "message": "Hello json" };

  if (process.env.MESSAGE_STYLE === "uppercase") {
    let message = xjson['message'].toUpperCase()
    xjson['message'] = message;
    res.json(xjson);
  } else {
    res.json(xjson);
  }
});

app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
  }, function(req, res) {
    let time = { "time": req.time}
    res.json(time);
  })




































module.exports = app;
