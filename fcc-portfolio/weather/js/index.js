var unit = 0; //0 = C; 1 = F
var temp = 25;

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
    setTemp(temp, unit);
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