var acc = "";

$(document).ready(function(){
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] =  "Domingo";
    weekday[1] = "Segunda";
    weekday[2] = "Terça";
    weekday[3] = "Quarta";
    weekday[4] = "Quinta";
    weekday[5] = "Sexta";
    weekday[6] = "Sábado";
    
    var n = weekday[d.getDay()];
    
    if (d == 3){
        $("#result").text("Já é sexta, já pode beber!");
    }
    else{
        $("#result").text("Ainda é " + n + ", ainda não pode beber...");
    }
});
