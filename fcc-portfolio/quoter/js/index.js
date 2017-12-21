var l_eye_l = 48;
var l_eye_t = 35;
var r_eye_l = 62;
var r_eye_t = 36;

window.onload = function() {
    $("#homer").css("display", "block");
    updateQuote();
    $('#loading').css("display", "none");
}

$('.hover-button').hover(
   function(){
      $(this).css("color", "#8899ff");
      $(this).css("border-color", "#8899ff");
      
   }, function(){
      $(this).css("color", "white");
      $(this).css("border-color", "white");
   }
);

$("#quoteButton").on("click", function(){
    $("#animator").removeClass("bounceIn");
    $("#animator").addClass("bounceOut"); 
    
    $('#animator').one('animationend', function(){
        updateQuote();
        $("#animator").removeClass("bounceOut");
        $("#animator").addClass("bounceIn"); 
    });

    

    //$("#animator").removeClass("bounceOut");
    //$("#animator").addClass("bounceIn"); 
});

function updateQuote(){
    $.getJSON( "js/quotes.json", function(json) {
        var num = Math.floor(Math.random() * (json.quotes.length + 1));
        var quote = json.quotes[num]["quote"]
        $("#quote").text(quote);
        $("#twitter").attr("href", "https://twitter.com/intent/tweet?text=\"" + quote + "\" -Homer J Simpson&hashtags=quotes");
    });
    
    
}

$( document ).on( "mousemove", function( event ) {
    var eye = document.querySelector("#eye-left");
    var eyeRects = eye.getBoundingClientRect();
    var eyeX = eyeRects.left + eyeRects.width / 2;
    var eyeY = eyeRects.top + eyeRects.height / 2;
    var bigY = event.pageY - eyeY;
    var bigX = event.pageX - eyeX;
    var bigR = Math.sqrt(bigX*bigX + bigY*bigY);
    var r = 3;
    var y = bigY*r/bigR;
    var x = bigX*r/bigR;
    
    $("#eye-left").css("top", l_eye_t + y +"%")
    $("#eye-left").css("left", l_eye_l + x +"%")
 
    eye = document.querySelector("#eye-right");
    eyeRects = eye.getBoundingClientRect();
     eyeX = eyeRects.left + eyeRects.width / 2;
     eyeY = eyeRects.top + eyeRects.height / 2;
     bigY = event.pageY - eyeY;
     bigX = event.pageX - eyeX;
     bigR = Math.sqrt(bigX*bigX + bigY*bigY);
     r = 3;
     y = bigY*r/bigR;
     x = bigX*r/bigR;
    $("#eye-right").css("top", r_eye_t + y +"%")
    $("#eye-right").css("left", r_eye_l + x +"%")
    
});