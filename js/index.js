/**********THEATER**********/
$(window).on("load", function() {
    $("#frame").removeClass("invisible");
    $("#frame").addClass("fadeIn");
});


/*****SMOOTH SCROLL*****/
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

/****APPEAR ON SCROLL**/
$(document).ready(function() {
    console.log("hey");

    var $window = $(window);
    $window.on('scroll', check_if_in_view);
    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');
    
    function check_if_in_view() {
      var window_height = $window.height();
      var window_top_position = $window.scrollTop();
      var window_bottom_position = (window_top_position + window_height);
    
      $.each($('h3.animated.invisible'), function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
        //check to see if this current container is within viewport
        if (element_top_position <= window_bottom_position){
          $element.removeClass("invisible");
          $element.addClass('slideInRight');
        }
      });
      
      $.each($('img.animated.invisible'), function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
        //check to see if this current container is within viewport
        if (element_bottom_position <= window_bottom_position){
          $element.removeClass("invisible");
          $element.addClass('bounceIn');
        }
      });
      
      $.each($('h1.animated'), function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
        //check to see if this current container is within viewport
        if (element_bottom_position <= window_bottom_position){
          $element.addClass('swing');
        }
        else{
            $element.removeClass("swing")
        }
      });
    }
});
/***************Projetos***********/
var trans = 0;
let details = ['certificado pelo <a target="_blank" href="https://freecodecamp.org/certification/michaelbarney/legacy-front-end">Free Code Camp</a>', 
"estudante na <a href='http://academy.cin.ufpe.br/index.php/pt/academia/' target='_blank'>Apple Developer Academy", "1º lugar em todas", "4 anos, 3 artigos e 3 patentes"];
$(document).ready(function(){
    checkTrans();
    $("#detail").html(details[0]);

    $('.owl-carousel').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        dots: false,
        center: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    })
    
    $("#tipos li").click(function () {
        $(".active").removeClass("active");
        $(this).addClass("active");
        var goTo = parseInt($(".active").attr("id"));
        console.log(parseInt($(".active").attr("id")));
        $('.owl-carousel').trigger('to.owl.carousel', goTo );
    })
    
    $('.owl-carousel').on('changed.owl.carousel', function (e) {
        console.log("current: ",e.item.index) //same
        console.log("total: ",e.item.count)   //total
        
        var current = e.item.index;
        var activeLi = NaN;
        if (current >= 0 && current < 9) {
            activeLi = 0;
        }
        else if (current >= 9 && current < 12){
            activeLi = 1;
        }
        else if (current >= 12 && current < 16) {
            activeLi = 2;
        }
        else if (current >= 16){
            activeLi = 3;
        }
        
        if (!isNaN(activeLi)){
            $(".active").removeClass("active");
            $("#tipos li").eq(activeLi).addClass("active");
            checkTrans();
            console.log("yo");
            console.log(details[activeLi]);
            $("#detail").html(details[activeLi]);
        }
        //$(".active").removeClass("active");
        //$("#tipos li").get(activeLi).addClass("active");
        //checkTrans();
    })

});

function checkTrans() {
    trans = trans +  $(window).width()/2 - $(".active").width()/2 - $(".active").position().left;
    $("#tipos").css("transform", "translateX("+trans+"px)");

}