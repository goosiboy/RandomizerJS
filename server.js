const express = require('express');
const app = express();
const port = 3010;
const Logger = require('logfile-writer');
const path = require('path');

const public = path.join(__dirname, "public");
const index = path.join(public, "index.html");

Logger.INIT("./logs", "server");


app.get('/', function(req, res) { 
    Logger.ERROR(`${index} has been called`);
    res.sendFile(index);
});

app.use(express.static(public));

app.listen(port, () => Logger.INFO(`Express server listening to the port ${port}`));
