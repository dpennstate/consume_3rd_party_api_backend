const express = require('express');
const app = express();
const {connectDB} = require('./db')
const {RegisterRoutes} = require('./routes/routes')
const bodyParser = require('body-parser')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080
RegisterRoutes(app)
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})