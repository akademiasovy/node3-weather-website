const request = require('request')

const forecast = (latitude,longitude, callback) => {
     
    const url = 'https://api.darksky.net/forecast/d543729bc1417afc67c34484ff37a6c4/'+latitude+','+longitude+'?units=si'

    request({url, json:true},(error, {body})=>{

        if(error){
            callback('Unable to connect to location services!',undefined)
        }else if(body.error){
            callback('Unable to find location.',undefined)
        }else{
            callback(undefined,{
                currentWeather: body.daily.data[0].summary,
                precipProbability: body.currently.precipProbability,
                temperature: body.currently.temperature
            })
        }

    })

}

module.exports = forecast

