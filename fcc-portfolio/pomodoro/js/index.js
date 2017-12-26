//important variables
var task;

/******AUDIOS*****/
var audioFiles = [
    "./audios/ahYeah.mp3", //ok
    "./audios/allYou.mp3",  //novo---------------
    "./audios/beep.mp3",  //novo------------------
    "./audios/eagle.mp3", //ok-------------------
    "./audios/getAfterIt.mp3", //novo----------------
    "./audios/noExcuses.mp3", //novo--------------
    "./audios/ringRing.mp3", //------------------------
    "./audios/youGotThis.mp3", //?
];
window.onload  = function(){
    $("#answer").focus();
    init();
};
function preloadAudio(url) {
    var audio = new Audio();
    audio.src = url;
}
function play(index) {
    var audio = new Audio(audioFiles[index]);
    audio.play();
}

/******COUNTDOWNS******/
//25, 15 or 5 mminutes
//doing, long, short 
var state = "doing";
var breaks = 0;
var minutesLeft;
var secondsLeft;
var interval;
function startClock(minutes){
    minutesLeft = minutes;
    secondsLeft = 0;
    updateDisplay();
    interval = setInterval(updateClock, 1000);
}

function updateClock(){
    if(secondsLeft==0 && minutesLeft ==0){
        clearInterval(interval);
        ring();
    }
    else if(secondsLeft == 0){
        secondsLeft = 59;
        minutesLeft--;
    }
    else{
        secondsLeft--;
    }
    updateDisplay();
}

function updateDisplay(){
    var m = "";
    var s = "";
    if(minutesLeft < 10) m="0";
    if(secondsLeft < 10) s="0";
    $("#clock").text(m + minutesLeft + ":" + s + secondsLeft);  
}

function ring(){
    if(state == "doing"){
        play(2);
        if(breaks <= 4){
            state = "short";
            $("#clock").removeClass("bounceIn").addClass("bounceOut");
            
            $('#clock').one('animationend', function(){
                $("#clock").css("display", "none");
                $("#short").removeClass("bounceOut").addClass("bounceIn");
                $("#short").css("display", "inline-block");
                $("#clock").off('animationend');
            });
        }
    }
    else{
        play(6);
        $("#clock").removeClass("bounceIn").addClass("bounceOut");
        $('#clock').one('animationend', function(){
            $("#clock").css("display", "none");
            $("#go").removeClass("bounceOut").addClass("bounceIn");
            $("#go").css("display", "inline-block");
            $("#go").off('animationend');
            state="doing";
        });
    }
}
/*****THE MAIN CODE********/
// we start preloading all the audio files
for (var i in audioFiles) {
    preloadAudio(audioFiles[i]);
}

function init() {
    $("#loader").addClass("slideOutUp");
    play(5);
}


/****actionables******/
$("input[type='submit']").click(function() { 
    task = $("#answer").val();
    $("#task").css("display", "block");
    $("#task").text("Task: " + task);
    $("#task").removeClass("slideOutUp").addClass("slideInUp");
    
    $("#question").removeClass("slideInLeft").addClass("slideOutLeft");
    $("#question").one("animationend", function(){
        $("#question").css("display", "none")
        $("#go").removeClass("bounceOut").addClass("bounceIn");
        $("#go").css("display", "inline-block");
    })
    
    play(1);
    return false; 
});

function go(type){
    if(type == "go"){
        $("#go").removeClass("bounceIn").addClass("bounceOut")
        $('#go').one('animationend', function(){
            $("#clock").removeClass("bounceOut").addClass("bounceIn");
            $("#clock").css("display", "inline-block");
            $("#go").css("display", "none");
            play(4);
            startClock(25);
            $("#go").off('animationend');

            $('#finished').css("display", "inline-block");
            $("#finished").removeClass("bounceOut").addClass("bounceIn");
        });
    }
    
    else if(type == "short"){
        $("#short").removeClass("bounceIn").addClass("bounceOut")
        $('#short').one('animationend', function(){
            $("#short").css("display", "none");
            $("#clock").removeClass("bounceOut").addClass("bounceIn");
            $("#clock").css("display", "inline-block");
            $("#go").css("display", "none");
            play(7);
            startClock(5);
            $("#short").off('animationend');
            $('#finished').css("display", "inline-block");
            $("#finished").removeClass("bounceOut").addClass("bounceIn");
        });   
        
    }

}

function finish(){
    state = "doing";
    clearInterval(interval);
    play(0)
    
    /***If clock on screen****/
    $("#clock").removeClass("bounceIn").addClass("bounceOut");
    $("#task").removeClass("slideInUp").addClass("slideOutUp");
    $("#finished").removeClass("bounceIn").addClass("bounceOut");
    
    $('#clock').one('animationend', function(){
        $("#clock").css("display", "none");
        $("#task").css("display", "none"); 
        
        $("#question").css("display", "inline-block");
        /*$("#question").css("margin-top", "150pt");*/
        $("#question").removeClass("slideOutLeft").addClass("slideInLeft");
        $("#questionText").text("What's your next task?"); 
        $("#answer").val("");    
        
        $("#question").one("animationend", function(){
            $("#answer").focus(); 
            $("#question").off('animationend');
            $('#finished').css("display", "none");
        });
        $("#clock").off('animationend');
        state="doing";
    });
    /***** Go on Screen*******/
    
}