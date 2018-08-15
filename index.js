const express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');
const {connection} = require('./communication/connection');


app.use(express.static(path.join(__dirname, 'public', 'dist', 'jass-front-end')));
require('./prod')(app);
connection(server);

app.all('*', (req, res) => {
    res.status(200).sendFile(__dirname + '/public/dist/jass-front-end/index.html');
});

const port = process.env.PORT || 3400;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});