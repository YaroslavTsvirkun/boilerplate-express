let path = require('path');
let express = require('express');
let app = express();

process.env.MESSAGE_STYLE = "uppercase"

app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get("/json", (req, res) => {
    let xjson = {"message": "Hello json"};

    if (process.env.MESSAGE_STYLE === "uppercase") {
        let message = xjson['message'].toUpperCase()
        xjson['message'] = message;
        res.json(xjson['message']);
    } else {
        res.json(xjson);
    }   
  });


































 module.exports = app;
