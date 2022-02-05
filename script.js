var cities = [];

var myApi = 

$("#searchBtn").on("click", function () {
    var cityInput = $("#city-list").val();
    cities.push(cityInput);
    searchCity(cityInput);
    renderCities();

});


