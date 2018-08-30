var express = require('express');
const Weather = require('./weather');
var app = express();
const request = require('request');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

let temperature = '';
let humidity = '';
let apparentTemperature = '';

var weather = new Weather();

weather.on('gotSummary', (stats) => {
  // Set global variables to be sent to web page when API is complete
  temperature = +Math.round(stats.temperature); 
  humidity = stats.humidity; 
  apparentTemperature = Math.round(stats.apparentTemperature); 

});

weather.getWeather();  //  This will invoke the API to rerieve data

app.get('/', function (req, res) {
   res.render('weather', {temperature: temperature , humidity: humidity , apparentTemperature: apparentTemperature , error: 'Error, please try again'});
   res.end();
})




var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
 

   console.log("Example app listening at http://%s:%s", host, port)
})

module.exports.server = server;