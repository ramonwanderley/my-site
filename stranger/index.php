<!DOCTYPE html>
<html lang="pt-br">
<head>
  <title>Stranger Messages</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
  <link rel="icon" href="images/favicon.ico" type="image/x-icon">
  <!--link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"-->
  <link rel="stylesheet" href="packs/bootstrap.min.css">
  <!--script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script-->
  <!--script src="node_modules/jquery/dist/jquery.min.js"></script-->
  <!--script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script-->
  <!--script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script-->
  <!--script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script-->
  <script src="packs/jquery.min.js"></script>
  <script src="packs/bootstrap.min.js"></script>
  <script src='Animated_GIF.js'></script>
  <script src='gifshot.js'></script>
  
</head>

<body>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.7&appId=309540802724391";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
  
  <h1>Stranger Things Criador de GIFS</h1>
  <table style="width:50%">
    <input id="msg" style="width:100%" type="text" name="msg" placeholder="mensagem para ser convertida" required />
    <button style="width:80%; margin-left:10%" onClick="convert(this.form)">converter</button>
  </table>
  <div id="content"></div>
  <script type="text/javascript">
  
    $('#msg').bind('keypress', function (event) {
          var regex = new RegExp("^[a-zA-Z \]+$");
          var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
          if (!regex.test(key)) {
             event.preventDefault();
             return false;
          }
    });
    function convert(form){
        var msg = document.getElementById('msg').value.toUpperCase();

        var charecs = [];
        for(var i = 0; i < msg.length; i++){
          var char = msg.charAt(i);
          if (char == ' ') char = "Vazio";
          
          var link = 'https://imaginefield-minimarvin.c9.io/stranger/images/' + char + '.png'
          charecs.push(link)
        }
        var link = 'https://imaginefield-minimarvin.c9.io/stranger/images/Vazio.png'
        charecs.push(link);
        gifshot.createGIF({
            images: charecs,
            interval: 1,
            gifWidth: 400,
            gifHeight: 300,
            numFrames: msg.length,
            text: 'Created Using Stranger Text',
            fontWeight: 'bold',
            fontColor: '#FFFFFF',
            textAlign: 'right'
        }, function (obj) {
            if (!obj.error) {
                var image = obj.image, animatedImage = document.createElement('img');
                animatedImage.src = image;
                var div = document.getElementById('content');
                div.innerHTML="<h3>https://imaginefield-minimarvin.c9.io/stranger/tmp/" + msg + ".gif</h3>" +
                             '<div class="fb-share-button" data-href="https://imaginefield-minimarvin.c9.io/stranger/tmp/' + msg +'.gif" data-layout="button" data-size="large" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Compartilhar</a></div>'
                              ;
                div.appendChild(animatedImage);
                $.ajax({
                  type: "POST",
                  url: "upload.php",
                  data: { 
                     img: image,
                     name: msg
                  }
                }).done(function(o) {
                  console.log('saved'); 
                });
            }
        });
    }
  </script>
</body>
</html>
