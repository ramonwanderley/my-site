//begin the game

var audioFiles = [
    "./sound/k.wav", 
    "./sound/1.wav", 
    "./sound/2.wav", 
    "./sound/3.wav", 
    "./sound/4.wav",
    "./sound/p.wav",
    "./sound/w.wav"
];

function preloadAudio(url) {
    var audio = new Audio();
    audio.src = url;
}
function play(index) {
    var audio = new Audio(audioFiles[index]);
    audio.play();
}
for (var i in audioFiles) {
    preloadAudio(audioFiles[i]);
}

var sequence = [];
var canPlay = false;
var at = 0;
var strict = false;

var colors = ["#dd4b3e", "#3edd4b", "#ffea37", "#4b3edd"];
var colorsB = ["darkred", "darkgreen", "DarkGoldenRod ", "darkblue"];

var time = 500;

$(".buttonx").click(function(){
    console.log(at + 1);
    if(canPlay){
        var led = $(this).attr("id");
        play(led);
        blinkOnce(led);
    }    
});

$("#strict").click(function(){
    play(0);
    if(!strict){
        $("#strict").css("background-color", "lightgreen");
        $("#strict").css("box-shadow", "0px 0px 50px 3px darkgreen");
        strict = true;
    }
    else{
        $("#strict").css("background-color", "white");
        $("#strict").css("box-shadow", "inset 0px 0px 10px 0px rgba(0, 0, 0, 0.75)");
        //$("#strict").css("box-shadow", "inset 0px 0px 10px 0px rgba(0,0,0,0.75);");
        strict = false;
    }
});
$("#start").click(function(){
    play(0);
    $("#start").css("background-color", "red");
    $("#start").css("box-shadow", "0px 0px 50px 3px darkred");
    setTimeout(function(){
        $("#start").css("background-color", "white");
        $("#start").css("box-shadow", "inset 0px 0px 10px 0px rgba(0, 0, 0, 0.75)");
        setTimeout(function(){
          $("#start").css("background-color", "red");
          $("#start").css("box-shadow", "0px 0px 50px 3px darkred");          
        }, 200)
    }, 200);   
    setTimeout(function(){
        start();
    }, time*2)
});

function start(){
    console.log("reset");
    sequence = [];
    at = 0;
    $("#count").text(at);
    getNext();
    blink(0, sequence);
}
function getNext(){
    var next = Math.floor(Math.random() * 4) + 1;
    sequence.push(next);
    //console.log(sequence);
}

function blink(i, array){
    var led = array[i];
    play(led);
    $("#"+led).css("background", colors[led - 1]);
    $("#"+led).css("box-shadow", "0px 0px 50px 3px " + colorsB[led - 1]);
    
    setTimeout(function(){ 
        $("#"+led).css("background", "white");
        $("#"+led).css("box-shadow", "inset 0px 0px 30px 0px rgba(0, 0, 0, 0.75)");
        if(i != array.length - 1){
            setTimeout(function(){
                blink(i + 1, array, true);
            }, time);
        }
        else{
            canPlay = true;
        }
    }, time);
}

function blinkWrong(){
    play(6);
    canPlay = false;
    $(".buttonx").css("background", colors[0]);
    $(".buttonx").css("box-shadow", "0px 0px 50px 3px " + colorsB[0]);
    setTimeout(function(){ 
        //console.log("off");
        $(".buttonx").css("background", "white");
        $(".buttonx").css("box-shadow", "inset 0px 0px 30px 0px rgba(0, 0, 0, 0.75)");
        canPlay = true;
        setTimeout(function(){
            if(!strict){
                blink(0, sequence);
            }
            else{
                start();
            }
        }, time);
    }, time);
}

function blinkRight(){
    play(5);
    canPlay = false;
    $(".buttonx").css("background", colors[1]);
    $(".buttonx").css("box-shadow", "0px 0px 50px 3px " + colorsB[1]);
    
    setTimeout(function(){ 
        console.log("off");
        $(".buttonx").css("background", "white");
        $(".buttonx").css("box-shadow", "inset 0px 0px 30px 0px rgba(0, 0, 0, 0.75)");
        canPlay = true;
        setTimeout(function(){
            getNext();
            blink(0, sequence);
        }, time);
    }, time);
}

function blinkOnce(led){
    var l = led;
    canPlay = false;
    $("#"+l).css("background", colors[led - 1]);
    $("#"+l).css("box-shadow", "0px 0px 50px 3px " + colorsB[led - 1]);
    setTimeout(function(){ 
        //console.log("off");
        //console.log(l);
        $("#" + l).css("background", "white");
        $("#" + l).css("box-shadow", "inset 0px 0px 30px 0px rgba(0, 0, 0, 0.75)");
        canPlay = true;
        setTimeout(function(){                     
                                                    //console.log(led);
                                                    //console.log("At = " + at);
                                                    if(led == sequence[at]){
                                                        //console.log("ok");
                                                         $("#count").text(at + 1);
                                                         at++;
                                                        
                                                        console.log("at updated to : " + at);
                                                        if(at == sequence.length){
                                                            if(at == 20){
                                                                alert('you won!');
                                                            }
                                                            at = 0;
                                                            $("#count").text(at);
                                                            canPlay = false;
                                                            blinkRight();
                                                        }
                                                    }
                                                    else{
                                                        //console.log("wrong");
                                                        blinkWrong();
                                                        at = 0;
                                                        $("#count").text(at);
                                                    }
        }, time);
    }, time);
}