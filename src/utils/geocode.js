const request = require('request')

/* The call to geocode provides both arguments, the address and the callback function 
    The call to geocode provides an address and a callback function as it did before.
    Inside the callback function that calls forecast. forecast won’t get called until after
    geocode is complete*/
const geocode = (address, callback )=>{
    // property shoethand implemented
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoibG9oaXRobXAyNiIsImEiOiJjbGIzODdxYWwwOXlkM29vYWt4NmlteWY2In0.pjVOasE4E-XcqduRVS5q7g"
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback("unable to connect weather service", undefined)
        }else if(body.features.length === 0){
           callback("unable to connect location", undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
        
    })
}

module.exports = geocode