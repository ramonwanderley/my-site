var acc = "";

$(document).ready(function(){
    var width = $("#numbers").width()/3;
    $('.number').height(width);
    var height = $('.number').height();
    width = $("#numbers").height()/5;
    $('.op').height(width);
});

$(".number").hover(function(){
    $(this).css("background-color","#d9d7b2");
},
function(){
    $(this).css("background-color","#9a4456");   
});
$(".op").hover(function(){
    $(this).css("background-color","#95847c");
},
function(){
    $(this).css("background-color","#723534");   
});

var oneOp = false;
var dec = false;
var size = 0;
var limit = 16;

$(".number").click(function(){
    switch ($(this).text()) {
        case '=':
            var res = $("#result").text()
            $("#acc").text(res);
            acc = res;
            calculate(acc);
            break;
        
        case '.':
            if(!dec && size<=limit){
                acc = acc + $(this).text();
                $("#acc").text(acc);
                dec = true;
                size++
            }
            break
        
        default:
        dec = false;
        if(size <= limit){
           acc = acc + $(this).text();
           $("#acc").text(acc);
            size++;
        }
    }
    calculate(acc);
    oneOp = false;
});



$(".op").click(function(){
    switch ($(this).text()) {
        case 'rst':
             $("#acc").text("");
             $("#result").text("");
             acc = "";
             size = 0;
             oneOp = false;
             dec = false;
            break;
        
        default:
            if(!oneOp && !dec && size <= limit){
               acc = acc + $(this).text();
               $("#acc").text(acc);
               oneOp = true;
               size++;
            }
            break;
    }
});




function calculate(acc){
    var acum;
    var op = "";
    var holds = "";
    var first = true;
    
    function c(op){
        if(first){
            acum = parseFloat(holds);
            first = false;
            console.log(acum);
        }
        else{
            switch (op) {
                case '+':
                    console.log(acum + " plus " + holds);
                    acum = acum + parseFloat(holds);
                    break;
                case 'x':
                    console.log(acum + " times " + holds);
                    acum = acum * parseFloat(holds);
                    break;    
                case '÷':
                    console.log(acum + " divided by " + holds);
                    acum = acum / parseFloat(holds);
                    break;
                case '-':
                    console.log(acum + " minus " + holds);
                    acum = acum - parseFloat(holds);
                    break;  
                default:
                    console.log(holds);
                    acum = parseFloat(holds);
                    break;
            }   
        }
        holds = "";
    }
    
    for(var i in acc){
        switch (acc[i]) {
            case '+':
                c(op);
                op = '+';
                break;
                
            case 'x':
                c(op);
                op = 'x';
                break;
            case '÷':
                c(op);
                op = '÷';
                break;
            case '-':
                c(op);
                op = '-';
                break;     
            default:
                holds = holds + acc[i];
                break;
        }    
    }
    switch (op) {
        case '+':
            console.log(acum + " plus " + holds);
            acum = acum + parseFloat(holds);
            break;
        case 'x':
            console.log(acum + " times " + holds);
            acum = acum * parseFloat(holds);
            break; 
        case '÷':
            console.log(acum + " divided by " + holds);
            acum = acum / parseFloat(holds);
            break; 
        case '-':
            console.log(acum + " minus by " + holds);
            acum = acum - parseFloat(holds);
            break;   
        default:
            console.log(holds);
            acum = parseFloat(holds);
            break;
    }  
    $("#result").text(acum);
}