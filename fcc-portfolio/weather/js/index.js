var unit = 0; //0 = C; 1 = F
var temp = 25;
var city;
$("#button-holder").on("click", function(){
    if($(this).css("text-align") == "left"){
        $(this).css("text-align", "right");
        unit = 1;
    }
    else{
        $(this).css("text-align", "left");
        unit = 0;
    }
    setTemp(temp, unit);
})

window.onload = function(){
    var lat;
    var lon;
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        $("#data").html("latitude: " + lat  + "<br>longitude: " + lon);
        
        $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat="+ lat + "&lon=" + lon, function(json){
            city = json["name"];
            temp = Math.round(json["main"]["temp"]);
            var main = json["weather"]["main"];
            var description = json["weather"][0]["description"];
            
            setTemp(temp, unit);
            $("#city").text(city);
            $("#weather").text(description);
        });
      });
    }
}

function setTemp(celcius, unit){
    var mt = celcius;
    var u = "°C";
    if(unit == 1){
        mt= celcius*1.8 + 32;
        u = "°F";
    }
    $("#temp").text(mt+u);
}