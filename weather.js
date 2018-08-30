
const EventEmitter = require('events');
const https = require('https');
let currStats = '';


 var APIurl = 'https://api.darksky.net/forecast/55c46895360cef14cf69fb233d156bbf/39.952583,-75.165222';
 let data = '';
 class Weather extends EventEmitter{

	 getWeather()  {
	 	console.log("Getting weather");
	    this.apiCall(APIurl);
	 }

     apiCall(strURL) { 
         https.get(strURL, (resp) => {

         console.log('API Call12');
  // A chunk of data has been recieved.
         resp.on('data', (chunk) => {
            data += chunk;
   // console.log('Chunk='+chunk);
         });

  // The whole response has been received. Print out the result.
		  resp.on('end', () => {
		  	var parsedData = JSON.parse(data);
		   console.log("Emitting "+parsedData.currently.temperature);
		   currStats = parsedData.currently;   
		   	  this.emit('gotSummary',currStats);
		 
		  });

		}).on("error", (err) => {
		  console.log("Error: " + err.message);
		});
		}


}

 module.exports = Weather;

