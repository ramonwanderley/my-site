if (location.protocol != 'https:'){
 location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

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
    
    if(getParameterByName("city") != null){
        var city =getParameterByName("city");
        $.getJSON("https://api.openweathermap.org/data/2.5/weather?appid=26e86f6a7a3e1882df78703644334252&units=metric&q="+ city, function(json){
            temp = Math.round(json["main"]["temp"]);
            var main = json["weather"][0]["main"];
            var description = json["weather"][0]["description"];
            var id = json["weather"][0]["id"];
            $("#w_icon").addClass("owf-"+id)
            setTemp(temp, unit);
            $("#city").text(city);
            $("#weather").text(description);
            
            $("#shower").css("display", "block");
            $("#shower").addClass("bounceIn");
        });
    }
    
    else{
        var lat;
        var lon;
    
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            $.getJSON("https://api.openweathermap.org/data/2.5/weather?appid=26e86f6a7a3e1882df78703644334252&units=metric&lat="+ lat + "&lon=" + lon, function(json){
                city = json["name"];
                temp = Math.round(json["main"]["temp"]);
                var main = json["weather"][0]["main"];
                var description = json["weather"][0]["description"];
                var id = json["weather"][0]["id"];
                $("#w_icon").addClass("owf-"+id)
                setTemp(temp, unit);
                $("#city").text(city);
                $("#weather").text(description);
                
                $("#shower").css("display", "block");
                $("#shower").addClass("bounceIn");
            });
          });
        }
    }
}

function setTemp(celcius, unit){
    var mt = celcius;
    var u = "°C";
    if(unit == 1){
        mt= Math.round(celcius*1.8 + 32);
        u = "°F";
    }
    $("#temp").text(mt+u);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}