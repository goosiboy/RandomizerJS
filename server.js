const express = require('express');
const app = express();
const port = 3010;
const path = require('path');

const public = path.join(__dirname, "public");
const index = path.join(public, "index.html");

app.get('/', function(req, res) { 
    res.sendFile(index);
});

app.use(express.static(public));

app.listen(port, () => console.log("Hello world!"));
