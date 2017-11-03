if (location.protocol == 'https:'){
 location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
}

$(".type-wrap").typed({
	strings: ["Wikipedia Viewer"],
	typeSpeed: 50,
	contentType: 'html',
	callback: function(){
	    $("#choices").css("display", "block");
	}
});

$(".choice").hover(function(){
   $(this).css("background-color", "#ecf646") ;
}, function(){
   $(this).css("background-color", "#79b236") ;
});

$("#search").on("click", function(){
    $(".choice").removeClass("float");
    $("#search").addClass("bounceOutLeft");
    $("#random").addClass("bounceOut");
    $(".changed").css("display", "block");
    
    $("#textField").prop("disabled", false);
    
    $(".type-wrap").text('');
    $(".type-wrap").removeData('typed');
    $(".type-wrap").typed({
    	strings: ["Search Something..."],
    	typeSpeed: 100,
    	loop: false,
    	contentType: 'html',
    	callback: function(){
    	    $("#textField").focus().select()
    	}
    });
    $("#filler").css("display", "block");
});

$('#textField').on('input',function(e){
    var text = $("#textField").val();
    if(text == ""){
        $(".filling").addClass("bounceOutRight");
        $(".filling").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(".filling").remove();
        });
    }
    $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search="+text, function(json) {

        if($(".filling").length > 0){
            $(".filling").each(function(){
                //alert($(this).text());
                var index = json[1].indexOf($(this).text());
                if(index > -1){
                    json[1].splice(index, 1);
                }
                else{
                    $(this).removeClass("moves");
                    $(this).addClass("bounceOutRight");
                    $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $(this).remove();
                    });
                    // $(this).remove();
                }
            });
        }
        for(i = 0; i < json[1].length; i++){
            $("#filler").append("<div class='filling animated bounceInUp'>"+json[1][i]+"</div>");
        }  
        //$("#fill").text(json[1][0]);
    });
});

$("#filler").scroll(function(){
    var window_top_position = $("#filler").offset().top;
    
    $(".filling").each(function(){
        var element_top_position = $(this).offset().top;

        if(element_top_position <= window_top_position){
            $(this).removeClass("bounceInLeft").addClass("bounceOutLeft");
        }
        else{
            if($(this).hasClass("bounceInUp")){
                $(this).removeClass("bounceInUp");
            }
            if($(this).hasClass("bounceOutLeft")){
                $(this).removeClass("bounceOutLeft").addClass("bounceInLeft");
            }
        }
    });
});