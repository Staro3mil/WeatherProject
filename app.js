const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

    
});

app.post("/", (req, res) => {


        const query = req.body.cityName;
        const unit = "metric";
        const apiKey = "b087dd9b32136d59b4b21cf392ed05bb";
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
        https.get(url, function (response) {
            console.log(response.statusCode);

            response.on("data", function (data) {
                console.log(data);
                const weatherData = JSON.parse(data);
                console.log(weatherData);
                const temp = weatherData.main.temp;
                console.log(temp);
                const description = weatherData.weather[0].description;
                console.log(description);
                const img = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
                res.write("<p>The weather is currently " + description + "</p>");
                res.write("<h1>The temperature in "+ req.body.cityName +" is " + temp + " degrees Celcius.</h1>");
                res.write("<img src=" + img + ">");
                res.send();
            });
        });


    });





app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});