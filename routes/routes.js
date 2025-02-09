const {CurrentWeatherController, HistoricalWeatherController,
    HistoricalAggregationWeatherController, SummaryWeatherController} =
    require("../controllers/weather-controller");

function RegisterRoutes(app) {
    // Route for grabbing current weather and forecast data for the area the user wants
    app.post('/weather/current', (req, res) => {
        CurrentWeatherController(req, res)
    })

    // Route for grabbing historical weather for the area the user wants
    app.post('/weather/historical', (req, res) => {
        HistoricalWeatherController(req, res)
    })

    // Route for grabbing historical aggregation weather for the area the user wants
    app.post('/weather/historical-aggregation', (req, res) => {
        HistoricalAggregationWeatherController(req, res)
    })

    // Route for grabbing a summary of weather from Open Weather API
    app.post('/weather/summary', (req, res) => {
        SummaryWeatherController(req, res)
    })
}

module.exports = {RegisterRoutes}