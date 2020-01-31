var express = require('express');
var app = express();
var server = app.listen(8080, '192.168.1.114');
app.use(express.static('public'));
console.log("Server online");
