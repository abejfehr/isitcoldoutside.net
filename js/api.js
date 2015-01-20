/*
 * api.js
 *
 * The general purpose of this file at this point is to return an object that
 * contains all the necessary methods required to get weather data from various
 * APIs. This is being created to mitigate the limited number of calls that
 * certain APIs offer, and allow for a more extensible design(since more APIs
 * can be added later)
 *
 * Each API will define the following:
 *
 * apiKey
 *   The API key for the API in question, if one is needed.
 *
 * getTemperature(lat, long, callback)
 *   This function should take a user's coordinates and call the callback with
 *   the current temperature at their location in degrees Celsius.
 *
 *   Celsius keeps everyone sane.
 */

var weatherAPI = {
  wunderground: {
    apiKey: "ff3a846f77ed3baa",
    getTemperature: function(lat, long, callback) {
      var xmlhttp;
      if (window.XMLHttpRequest) { // IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
      } else { // IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          // Parse the return data
          var data = JSON.parse(xmlhttp.responseText);
          var temperature = data["current_observation"].temp_c;

          // Call the callback
          callback(temperature);
        }
      };
      xmlhttp.open("GET","http://api.wunderground.com/api/" + this.apiKey +
        "/conditions/q/" + lat + "," + long + ".json", true);
      xmlhttp.send();
    }
  }
}