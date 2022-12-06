const request = require('request')

/* The latitude and longitude from the geocoding operation is also
    provided as the input for the forecast function call and here fetch the information and  gives the output
    as weather information */
const forecast = (latitude, longitude, callback) => {
    const url = "https://api.weatherapi.com/v1/forecast.json?key=f45e61a2c0524f5ab77123522222911&q="+latitude+","+longitude+"&aqi=no/lang=ar"
     // Property Shoethand  and Destructuring Function Arguments implemented
     /* request library that allows it to Set json to true and request will 
        automatically parse the JSON into a JavaScript
        object 
    */
    request({url, json:true}, (error, {body}) =>{
        if(error){
            callback("unable to connect weather service", undefined)
        }else if(body.error){
           callback("unable to connect location", undefined)
        }else{
            callback(undefined, {
                place :body.location.name+" region weather is "+body.current.condition.text+
                ", It is currently " + body.current.temp_c+ "° celsius out, " +
                "There is a "+body.current.precip_mm+" % chance of rain. "+"This high today is " + body.forecast.forecastday[0].day.maxtemp_c + "° celsius with a low of " + body.forecast.forecastday[0].day.mintemp_c + "°celsius."
            })
            
        }
    })
}

module.exports = forecast