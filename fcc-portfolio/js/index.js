$(".fa-stack").hover(function(){
                      $(this).css("color", "#ffcc5c");
                      $(this).addClass("animated").addClass("wobble");
                     },
                     function(){
                      $(this).css("color", "white");
                      $(this).removeClass("wobble");
});

$(".black-fill").hover(function(){
                      $(this).css("background-color", "#ff6f69");
                     },
                     function(){
                      $(this).css("background-color", "rgba(0,0,0,0.75)");
                     }
);