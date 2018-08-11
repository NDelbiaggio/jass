const express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');


app.use(express.static(path.join(__dirname, 'public')));
require('./prod')(app);
require('./communication/connection')(server);

const port = process.env.PORT || 3400;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});