function validateBodyWeatherController(req) {
    if (req.body === undefined || req.body === null || req.body.zip === undefined || req.body.area === undefined ||
        (req.body.zip === null && req.body.area === null ) || (req.body.zip === "" && req.body.area === "")) {
        return false
    }
    return true
}

module.exports = {validateBodyWeatherController}