let path = require('path');
let express = require('express');
let bodyParser = require('body-parser')
let app = express();

process.env.MESSAGE_STYLE = "uppercase"

app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

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
  let time = { "time": req.time }
  res.json(time);
})

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

app.get("/name", (req, res) => {
    var firstName = req.query.first;
    var lastName = req.query.last;
    let xjson = { "name": `${firstName} ${lastName}` }
    res.json(xjson);
  });

app.get("/name", (req, res) => {
    let data = getUserDataWithQueryByRequest(req);
    let xjson = convertUserDataToJson(data);
    res.json(xjson);
});

app.post("/name", (req, res) => {
    let data = getUserDataWithBodyByRequest(req);
    let xjson = convertUserDataToJson(data);
    res.json(xjson);
});

function getUserDataWithQueryByRequest(req) {
    var firstName = req.query.first;
    var lastName = req.query.last;
    return [ firstName, lastName ];
}

function getUserDataWithBodyByRequest(req) {
    var firstName = req.body.first;
    var lastName = req.body.last;
    return [ firstName, lastName ];
}

function convertUserDataToJson(data) {
    let xjson = { "name": `${data[0]} ${data[1]}` }
    return xjson
}

module.exports = app;
