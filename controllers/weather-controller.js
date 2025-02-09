const {createAudit} = require("../services/auditHistoryService");
const {validateBodyWeatherController} = require("../utils/validate");
const {CurrentWeatherService, HistoricalWeatherService,
    HistoricalAggregationWeatherService, SummaryWeatherService} = require("../services/openweathermap-service");

async function CurrentWeatherController(req, res) {
    try {
        console.log("CurrentWeather API call started")
        if (validateBodyWeatherController(req)) {
            const currentWeatherResponse = await CurrentWeatherService(req.body.area, req.body.zip)

            if (currentWeatherResponse.data !== null && currentWeatherResponse.errorMessage === null) {
                createAudit("Test User", "/weather/current", true, new Date())
                console.log("CurrentWeather API call Successful")
                res.status(200).send({data: currentWeatherResponse.data, message: "Request Successful"})
            } else {
                createAudit("Test User", "/weather/current", false, new Date())
                console.log("Error occurred during currentWeatherService with error: ", currentWeatherResponse.errorMessage)
                res.status(500).send({message: "Error occurred while process request"})
            }
        } else {
            createAudit("Test User", "/weather/current", false, new Date())
            console.log("User made an invalid request in CurrentWeatherController")
            res.status(400).send({message: "Invalid Request"})
        }
    } catch (error) {
        createAudit("Test User", "/weather/current", false, new Date())
        console.error("Exception made during request in CurrentWeatherController with error: ", error)
        res.status(500).send({message: "Exception occurred while process request"})
        return
    }
}

// Note that ts is timestamp in UTC. It will be the responsibility of the client to pass the time as UTC as the
// API has no idea what the original timezone was without adding an extra timezone field. If further refined, timezone
// field may be added in which case ts would not have to come in as UTC

async function HistoricalWeatherController(req, res) {
    try{
        if (validateBodyWeatherController(req) && req.body.ts !== undefined && req.body.ts !== null &&
        req.body.ts !== "") {
            const historicalWeatherResponse = await HistoricalWeatherService(req.body.area, req.body.zip, req.body.ts)

            if (historicalWeatherResponse.data !== null && historicalWeatherResponse.errorMessage === null) {
                createAudit("Test User", "/weather/historical", true, new Date())
                res.status(200).send({data: historicalWeatherResponse.data, message: "Request Successful"})

            }
            else {
                createAudit("Test User", "/weather/historical", false, new Date())
                console.log("Error occurred during HistoricalWeatherController with error: ", historicalWeatherResponse.errorMessage)
                res.status(500).send({message: "Error occurred while process request"})
            }

        }
        else {
            createAudit("Test User", "/weather/historical", false, new Date())
            console.log("User made an invalid request in HistoricalWeatherController")
            res.status(400).send({message:"Invalid Request"})
        }
    }catch(error) {
        createAudit("Test User", "/weather/historical", false, new Date())
        console.log("Exception made during request in HistoricalWeatherController with error: ", error)
        res.status(500).send({message: "Error occurred while process request"})
    }

}

// date field will be in YYYY-MM-DD
async function HistoricalAggregationWeatherController(req, res) {
    try{
        if (validateBodyWeatherController(req) && req.body.dt !== undefined && req.body.dt !== null && req.body.dt !== "") {
            const historicalAggregationWeatherResponse = await HistoricalAggregationWeatherService(req.body.area, req.body.zip, req.body.dt)

            if (historicalAggregationWeatherResponse.data !== null && historicalAggregationWeatherResponse.errorMessage === null) {
                createAudit("Test User", "/weather/historical-aggregation", true, new Date())

                res.status(200).send({data: historicalAggregationWeatherResponse.data, message: "Request Successful"})

            }
            else {
                createAudit("Test User", "/weather/historical-aggregation", false, new Date())
                console.log("Error occurred during HistoricalAggregationWeatherController with error: ", historicalAggregationWeatherResponse.errorMessage)
                res.status(500).send({message: "Error occurred while process request"})
            }

        }
        else {
            createAudit("Test User", "/weather/historical-aggregation", false, new Date())
            console.log("User made an invalid request in HistoricalAggregationWeatherController")
            res.status(400).send({message:"Invalid Request"})
        }
    }catch(error) {
        createAudit("Test User", "/weather/historical-aggregation", false, new Date())
        console.log("Exception made during request in HistoricalAggregationWeatherController with error: ", error)
        res.status(500).send({message: "Error occurred while process request"})
    }

}

async function SummaryWeatherController(req, res) {
    try{
        if (validateBodyWeatherController(req)) {
            const summaryWeatherResponse = await SummaryWeatherService(req.body.area, req.body.zip)
            if (summaryWeatherResponse.data !== null && summaryWeatherResponse.errorMessage === null) {
                createAudit("Test User", "/weather/summary", true, new Date())
                res.status(200).send({data: summaryWeatherResponse.data, message: "Request Successful"})

            }
            else {
                createAudit("Test User", "/weather/summary", false, new Date())
                console.log("Error occurred during SummaryWeatherController with error: ", summaryWeatherResponse.errorMessage)
                res.status(500).send({message: "Error occurred while process request"})
            }
        }
        else {
            createAudit("Test User", "/weather/summary", false, new Date())
            console.log("User made an invalid request in SummaryWeatherController")
            res.status(400).send({message:"Invalid Request"})
        }
    }catch(error) {
        createAudit("Test User", "/weather/summary", false, new Date())
        console.log("Exception made during request in SummaryWeatherController with error: ", error)
        res.status(500).send({message: "Error occurred while process request"})
    }

}

module.exports = {CurrentWeatherController, HistoricalWeatherController,
    HistoricalAggregationWeatherController, SummaryWeatherController}
