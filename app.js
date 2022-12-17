'use strict';

// get all needed dependencies
const express = require('express');
const logger = require('silly-logger');

const prepairHTML = require('./app/prepairHTML');
const prepairINDEX = require('./app/prepairINDEX');

//  Create Express App
const app = express();

// define a port
const PORT = 8080;

//  Setup timeFormat
logger.timeFormat("MMM Do YY - h:mm:ss a");

// Message that the local server is starting
logger.startup("starting local server");

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(prepairINDEX());
});

app.get('/game/*', (req, res) => {
    if (prepairHTML(req.url) != undefined) {
        res.send(prepairHTML(req.url));
    }
    else {
        res.sendFile(__dirname + '/views/404.html');
    }
});

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/views/404.html');
});

app.listen(PORT, () =>{
    logger.success(`App ready on http://localhost:${PORT}/`);
});