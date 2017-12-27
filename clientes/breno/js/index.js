/*****
 * Site de Breno:

-------------clickability dos tratamentos
-------------agendamento
--------------preencher dados sobre cada tratamento (só lente de contato)
-deixar responsivo
-colocar no meu site
-mandar pra ele
 * 
 ******/
//flipping
var phrases;
var current = 0;
var max;
var interval;

function updatePhrase(){
    var next = current + 1;
    if(next >= max){
        next = 0;
    }
    console.log(phrases[current]);
    $(phrases[current]).removeClass("flipInX").addClass("flipOutX");
    $(phrases[current]).one('animationend', function(){
        $(phrases[current]).css("display", "none");
        $(phrases[next]).removeClass("flipOutX").addClass("flipInX");
        $(phrases[next]).css("display", "inline-block");
        $(phrases[current]).off('animationend');
        current = next;
    });
}

$(document).ready(function(){
    phrases  = $('.textRoll');
    max  = phrases.length;
    interval  = setInterval(updatePhrase, 5000);
});


//slow scrolls
var $doc = $('html, body');
$('.scroll').click(function() {
    $doc.animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
});
$("#callAction").click(function(){
     $doc.animate({
        scrollTop: $("#agendamento").offset().top
    }, 500);
    return false;  
})



//tratamentos
var aboutId;

$(".trat").click(function() {
  var id = $(this).attr("id");
  aboutId = "#"+id+"About";
  $("#darkAbout").removeClass("fadeOut").addClass("fadeIn");
  $(aboutId).removeClass("zoomOut").addClass("zoomIn");

  $('#darkAbout').css("display", "inline-block");
  $(aboutId).css("display", "inline-block");
});

$(".exit").click(function(){
    $("#darkAbout").removeClass("fadeIn").addClass("fadeOut");
    $(aboutId).removeClass("zoomIn").addClass("zoomOut");
    $(aboutId).one('animationend', function(){
        $("#darkAbout").css("display", "none");
        $(aboutId).css("display", "none");
        $(aboutId).off("animationend");
    });
});

//------------AGENDENDAMENTO-------------
var textRecife = ["Recife, PE", "Empresarial Rio Mar Trade Center", "(+55) 81 3877-5726 | breno@gmail.com"];

var out = 0;
$("#recife").click(function(){
   if(out == 0){
        $("#carpina").css("display", "none");
        $("#recife").css("width", "100%");
        $("#recife h2").text(textRecife[1]);
        $("#recife h3").text(textRecife[2]);
        out = 1; 
   }
   else{
        $("#recife").css("width", "50%");  
        $("#recife").one("transitionend", function(){
            $("#carpina").css("display", "inline-block");
        });
        $("#recife h2").text(textRecife[0]);
        $("#recife h3").text("");
        out = 0;
   }
});

var textCarpina = ["Carpina, PE", "Climeo - Clínica Médica e Odontológica", "(+55) 81 3621-6725| breno@gmail.com"];
$("#carpina").click(function(){
   if(out == 0){
        $("#recife").css("display", "none");
        $("#carpina").css("width", "100%");
        $("#carpina h2").text(textCarpina[1]);
        $("#carpina h3").text(textCarpina[2]);
        out = 1; 
   }
   else{
        $("#carpina").css("width", "50%");  
        $("#carpina").one("transitionend", function(){
            $("#recife").css("display", "inline-block");
        });
        $("#carpina h2").text(textCarpina[0]);
        $("#carpina h3").text("");
        out = 0;
   }
});