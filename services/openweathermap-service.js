const axios = require("axios");
const {config} = require("../config")
const geoBaseURL = "http://api.openweathermap.org/geo/1.0/";
const mapBaseURL = "https://api.openweathermap.org/data/3.0/onecall";

 async function CurrentWeatherService(area, zip) {
     try {
         const {lat, lon, code, errorMessage} = await GetLatLon(area, zip)

         if (code !== 200 || errorMessage !== null) {
             return {data: null, errorMessage: errorMessage}
         }
         const currentWeather = await axios.get(`${mapBaseURL}?lat=${lat}&lon=${lon}&appid=${config.OpenWeatherAPIKey}`)

         if (currentWeather.cod !== undefined && currentWeather.cod !== null) {
             console.error("Error occurred during CurrentWeatherService with error: ", currentWeather.message)
             return {data: null, errorMessage: `Error during request ${currentWeather.message}`}
         }
         console.log("Call successful for currentWeather")
         return {data: currentWeather.data, errorMessage: null}


     } catch (error) {
         console.error("Exception occurred in CurrentWeatherService with error: ", error)
         return {data: null, errorMessage: `Exception occurred: ${error}`}
     }

 }

async function HistoricalWeatherService(area, zip, datetime) {
    try {
        const {lat, lon, code, errorMessage} = await GetLatLon(area, zip)

        if (code !== 200 || errorMessage !== null) {
            return {data: null, errorMessage: errorMessage}
        }
        const unixTime = Date.parse(datetime)/1000
        const historicalWeather = await axios.get(`${mapBaseURL}/timemachine?lat=${lat}&lon=${lon}&dt=${unixTime}&appid=${config.OpenWeatherAPIKey}`)

        if (historicalWeather.cod !== undefined && historicalWeather.cod !== null) {
            console.error("Error occurred during HistoricalWeatherService with error: ", historicalWeather.message)
            return {data: null, errorMessage: `Error during request ${historicalWeather.message}`}
        }

        console.log("Call successful for historicalWeather")
        return {data: historicalWeather.data, errorMessage: null}
    } catch (error) {
        console.error("Exception occurred in HistoricalWeatherService with error: ", error)
        return {data: null, errorMessage: `Exception occurred: ${error}`}
    }
}

async function HistoricalAggregationWeatherService(area, zip, date) {
    try {
        const {lat, lon, code, errorMessage} = await GetLatLon(area, zip)

        if (code !== 200 || errorMessage !== null) {
            return {data: null, errorMessage: errorMessage}
        }

        const historicalAggregation = await axios.get(`${mapBaseURL}/day_summary?lat=${lat}&lon=${lon}&date=${date}&appid=${config.OpenWeatherAPIKey}`)

        if (historicalAggregation.cod !== undefined && historicalAggregation.cod !== null) {
            console.error("Error occurred during HistoricalAggregationWeatherService with error: ", historicalAggregation.message)
            return {data: null, errorMessage: `Error during request ${historicalAggregation.message}`}
        }

        console.log("Call successful for historicalAggregation")
        return {data: historicalAggregation.data, errorMessage: null}
    } catch (error) {
        console.error("Exception occurred in HistoricalAggregationWeatherService with error: ", error)
        return {data: null, errorMessage: `Exception occurred: ${error}`}
    }
}

async function SummaryWeatherService(area, zip) {
    try {
        const {lat, lon, code, errorMessage} = await GetLatLon(area, zip)

        if (code !== 200 || errorMessage !== null) {
            return {data: null, errorMessage: errorMessage}
        }

        const summaryWeather = await axios.get(`${mapBaseURL}/overview?lat=${lat}&lon=${lon}&appid=${config.OpenWeatherAPIKey}`)

        if (summaryWeather.cod !== undefined && summaryWeather.cod !== null) {
            console.error("Error occurred during SummaryWeatherService with error: ", summaryWeather.message)
            return {data: null, errorMessage: `Error during request ${summaryWeather.message}`}
        }

        console.log("Call successful for summaryWeather")
        return {data: summaryWeather.data, errorMessage: null}
    } catch (error) {
        console.error("Exception occurred in SummaryWeatherService with error: ", error)
        return {data: null, errorMessage: `Exception occurred: ${error}`}
    }
}

// Simplify lat and lon by using zip codes or city/state/country as data passed to get lat and lon
// Note, documentation doesn't show possible errors and so difficult to respond to those now. Will need to work
// on that later as it will require additional calls to figure out format of errors returned by them for Geo location
async function GetLatLon(area, zip) {
    try {
        if (area !== null && area !== "") {
            return axios.get(`${geoBaseURL}direct?q=${area}&limit=5&appid=${config.OpenWeatherAPIKey}`).then(result => {
                if (result !== undefined && result !== null) {
                    if (result.data[0].lat && result.data[0].lon) {
                        return {lat: result.data[0].lat, lon: result.data[0].lon, code: 200, errorMessage: null}
                    }
                }
                console.error(`Request for getting lat and lon with area had an error with area = ${area} `)
                return {lat: null, lon: null, code: 500, errorMessage: "Error occurred during request"}
            })
        }
        else if (zip !== null && zip !== "") {
            return axios.get(`${geoBaseURL}zip?zip=${zip}&appid=${config.OpenWeatherAPIKey}`).then(result => {
                if (result !== undefined && result !== null) {
                    if (result.data.lat && result.data.lon) {
                        return {lat: result.data.lat, lon: result.data.lon, code: 200, errorMessage: null}
                    }
                }
                console.error(`Request for getting lat and lon with zip had an error with zip = ${zip} `)
                return {lat: null, lon: null, code: 500, errorMessage: "Error occurred during request"}
            })
        }

        console.error(`Error occurred where area and zip do not have data and got past initial check. 
        Check immediately. Variables area = ${area} and zip = ${zip}`)
        return {lat: null, lon: null, code: 500, errorMessage: "Error occurred during request"}
    }catch(error) {
        console.error("Exception occurred during GetLatLon with error: ", error)
        return {lat: null, lon: null, code: 500, errorMessage: "Error occurred during request"}
    }

}

module.exports = {CurrentWeatherService, HistoricalWeatherService,
    HistoricalAggregationWeatherService, SummaryWeatherService}