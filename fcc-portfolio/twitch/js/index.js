var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
$(document).ready(function(){
     for (var i = 0; i< channels.length; i++){

        $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/" + channels[i], function(json){
            var channel = json["_links"]["channel"];
            channel = channel.split("/").pop();
            if(json["stream"] == null){
            }
            else{
                var game = json["stream"]["game"];
                $("#row1").append("<li><a target='_blank' href='https://www.twitch.tv/"+channel+"'>"+channel+"</a> - "+game+"</li>")
            }
        })
     }
});