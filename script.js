var cities = [];



$("#searchBtn").on("click", function () {
    var cityInput = $("#city-list").val();
    cities.push(cityInput);
    searchCity(cityInput);

    renderCities();
    
});



function renderCities() {
    $("#listOfCities").empty();
    
    for (i = 0; i < cities.length; i++) {
        var list = $("<li>");
        list.addClass("list-group-item city");
        list.attr("data-city", cities[i]);
        list.text(cities[i]);

        $("#listOfCities").append(list);}

        localStorage.setItem("city-name", JSON.stringify(cities));

        cities[i] === 0 (alert("What is your city?"));

};

$(document).on("click", ".city", function(){
    
    var cityInput = $(this).attr("data-city");

    searchCity(cityInput);   

});


$(document).ready(function(){
cities  =  JSON.parse(localStorage.getItem("city-name")) ;
if ( cities === null){
    cities = [];
 }

 renderCities();

});



function searchCity(cityInput){
    var myApi = "1435b62d6f12207244b5c82e99a5374a";
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&APPID=" + myApi;
    
    
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);

        var coordLon = response[0].lon;
        var coordLat = response[0].lat; 
        console.log(coordLat);
        console.log(coordLon);




        $("#city").html("<span class='cityFont'>" + response[0].name + "</span>");
        $("#date").html("<span class='cityFont'>" +(moment().format('L')) + "</span>");   


        var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coordLat + "&lon=" + coordLon + "&unit=imperial&APPID=a3b7974d1c92aeb51799206f2819a5fa";

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response) {
        console.log(response);

        var tempF = response.current.temp;
        $("#temperature").html("Temperature: " + tempF + " °F");
        
        var humidity = response.current.humidity;
        $("#humidity").text("Humidity: " + humidity);
        $("#wind-speed").text("Wind Speed: " + response.current.wind_speed);


            var UVcolors = $("<span>").text(response.current.uvi);

             if (response.current.uvi<=2.99) {
                 UVcolors.addClass("green");
             } else if (response.current.uvi >= 3 && response.current.uvi <=5.99){
                UVcolors.addClass("yellow");
             } else if (response.current.uvi >= 6 && response.current.uvi <=7.99){
                UVcolors.addClass("orange");
             } else if (response.current.uvi >= 8 && response.current.uvi <=9.99){
                UVcolors.addClass("red");
             } else {
                UVcolors.addClass("violet");
             }

            $("#uv-index").text("UV Index: ");
            $("#uv-index").append(UVcolors);

            $("#icon").empty();
            var icon = $("<img> </img>");
            var iconImg = response.current.weather[0].icon;
            icon.attr("src", "https://openweathermap.org/img/wn/" + iconImg + "@2x.png");
            icon.attr("width",120);
            $("#icon").append(icon);
            console.log(iconImg)

            $("#cardsHolder").empty();

            for (j = 0; j < 5; j++) {
                var block = $("<div>").addClass("card col-md-2");
                var dataForecast = $("<p>").text(moment.unix(response.daily[j].dt).format('MM/DD/YYYY'));
    
                var iconForecast = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.daily[j].weather[0].icon + "@2x.png");
                iconForecast.attr("width",100);   
                
                var tempForecast = $("<p>").text("Temp: " + response.daily[j].dt + " °F");
               
                var humidityForecast = $("<p>").text("Humidity: " + response.daily[j].humidity);
              
                 
                block.append(dataForecast, iconForecast, tempForecast, humidityForecast)
                $("#cardsHolder").append(block);
            }
        });
    });
}