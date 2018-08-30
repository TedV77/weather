const express = require('express');
const expObj = express();

const Weather = require('./weather');
const server = require('./server');


var weather = new Weather();

