Setup:

    After pulling project, run npm install to download and install all the necessary packages and generate a package-lock.json if you do not already have a package-lock.json
    A MongoDB will need to be setup prior. You can download and install a community server in your local here: https://www.mongodb.com/try/download/community. Note if you make any changes to the default localhost, you will need to update the change in db.js file to reflect it so it is still able to connect.
    An API Key will need to be obtained from Open Weather API. Go here https://openweathermap.org/api/one-call-3 and look at How to Start to set it up. Note that an account will need to be made and a credit card or debit card will need to be inserted so they have a record of it. Make sure when signing up to use One Call 3.0 if you want to be able to make 1,000 calls in a day without being charged.
    Once you obtain the API key from Open Weather API, you will need to put that key as a value in config.js file in OpenWeatherAPIKey field. It is required to make API calls, otherwise the calls will be denied.
    Run the command node server.js in the terminal for the project
    Your server should now be running. You can confirm by going to http://localhost:27017/ assuming you didn't change any defaults.
    The get command /weather/current will be a post that will access either an area or a zip that are both strings. The area field refers to any city or town.
    The get command /weather/historical will be a post that will access either an area or a zip that are both strings and a ts field that is a string that is a timestamp in the format YYYY-MM-DD HH:MM:SS. The area field refers to any city or town.
    The get command /weather/historical-aggregation will be a post that will access either an area or a zip that are both strings and a dt field that is a string that is a date in the format YYYY-MM-DD. The area field refers to any city or town.
    The get command /weather/summary will be a post that will access either an area or a zip that are both strings. The area field refers to any city or town.
