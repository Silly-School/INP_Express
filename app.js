'use strict';

// get all needed dependencies
const express = require('express');
const logger = require('silly-logger');

const prepairHTML = require('./app/prepairHTML');
const prepairINDEX = require('./app/prepairINDEX');

//  Create Express App
const app = express();

// define a port
const PORT = 3000;

//  Setup timeFormat
logger.timeFormat("MMM Do YY - h:mm:ss a");

// Message that the local server is starting
logger.startup("starting local server");

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(prepairINDEX());
});

app.get('/anno-1800', (req, res) => {
    res.send(prepairHTML(0));
});

app.get('/thehunter-call-of-the-wild', (req, res) => {
    res.send(prepairHTML(1));
});

app.get('/*', (req, res) => {
    logger.debug(req.url);
    res.sendFile(__dirname + '/views/404.html');
});

app.listen(PORT, () =>{
    logger.success(`Example app listening on http://localhost:${PORT}/`);
});