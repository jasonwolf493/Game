$( window ).on('load', function() {
  function getCoords(landStart,returnWhat){
    var commaLocation = landStart.indexOf(",");
    var landX = landStart.substr(0,commaLocation);
    landX = parseInt(landX);
    var landY = landStart.substr(commaLocation+1,landStart.length);
    landY = parseInt(landY);

    switch (returnWhat) {
      case "x":
        return landX
        break;
      case "y":
        return landY
        break;
      default:
        return landX+","+landY;
    }
  }
  function beachGeneration(){
    $( '.tile' ).each(function() {

      if ($(this).data("land-type")=="grass-tile") {
        var targetTile = $(this).data("coords")
        var xRight = getCoords($(this).data("coords"),"x")+1;
        var xLeft = getCoords($(this).data("coords"),"x")-1;
        var yDown = getCoords($(this).data("coords"),"y")+1;
        var yUp = getCoords($(this).data("coords"),"y")-1;
        var tileToRight = $('.tile[data-coords="'+xRight+','+getCoords($(this).data("coords"),"y")+'"]').data("land-type");
        var tileToLeft = $('.tile[data-coords="'+xLeft+','+getCoords($(this).data("coords"),"y")+'"]').data("land-type");
        var tileToTop = $('.tile[data-coords="'+getCoords($(this).data("coords"),"x")+','+yUp+'"]').data("land-type");
        var tileToBottom = $('.tile[data-coords="'+getCoords($(this).data("coords"),"x")+','+yDown+'"]').data("land-type");
        var tileTopLeft = $('.tile[data-coords="'+xLeft+','+yUp+'"]').data("land-type");
        var tileTopRight = $('.tile[data-coords="'+xRight+','+yUp+'"]').data("land-type");
        var tileBottomLeft = $('.tile[data-coords="'+xLeft+','+yDown+'"]').data("land-type");
        var tileBottomRight = $('.tile[data-coords="'+xRight+','+yDown+'"]').data("land-type");

        if (tileToRight=="water-tile") {
          $(this).data("land-type","beach-tile");
          $(this).css({"background-image":"url('img/beach-tile.png')","transform": "rotate(-90deg)"});
        }else {}

        if (tileToTop=="water-tile" && tileToRight!="water-tile" ) {
          $(this).data("land-type","beach-tile");
          $(this).css({"background-image":"url('img/beach-tile.png')","transform": "rotate(180deg)"});
        }else {}

        if (tileToBottom=="water-tile") {
          $(this).data("land-type","beach-tile");
          $(this).css("background-image","url('img/beach-tile.png')");
        }else {}

        if (tileToLeft=="water-tile") {
          $(this).data("land-type","beach-tile");
          $(this).css({"background-image":"url('img/beach-tile.png')","transform": "rotate(90deg)"});
        }else {}

        if (tileToLeft=="water-tile" && tileToBottom=="water-tile") {
          $(this).data("land-type","beach-tile");
          $(this).css({"background-image":"url('img/beach-corner-tile.png')","transform": "rotate(0deg)"});
        }

        if (tileToRight=="water-tile" && tileToBottom=="water-tile") {
          $(this).data("land-type","beach-tile");
          $(this).css({"background-image":"url('img/beach-corner-tile.png')","transform": "rotate(-90deg)"});
        }

        if (tileToRight=="water-tile" && tileToTop=="water-tile") {
          $(this).data("land-type","beach-tile");
          $(this).css({"background-image":"url('img/beach-corner-tile.png')","transform": "rotate(180deg)"});
        }

        if (tileToLeft=="water-tile" && tileToTop=="water-tile") {
          $(this).data("land-type","beach-tile");
          $(this).css({"background-image":"url('img/beach-corner-tile.png')","transform": "rotate(90deg)"});
        }

        if (tileToLeft=="water-tile" && tileToTop=="water-tile" && tileToBottom=="water-tile") {
          $(this).data("land-type","beach-tile");
          $(this).css({"background-image":"url('img/beach-peninsula-tile.png')","transform": "rotate(0deg)"});
        }

        if (tileToRight=="water-tile" && tileToTop=="water-tile" && tileToBottom=="water-tile") {
          $(this).data("land-type","beach-tile");
          $(this).css({"background-image":"url('img/beach-peninsula-tile.png')","transform": "rotate(180deg)"});
        }

        if (tileToRight=="water-tile" && tileToLeft=="water-tile" && tileToBottom=="water-tile") {
          $(this).data("land-type","beach-tile");
          $(this).css({"background-image":"url('img/beach-peninsula-tile.png')","transform": "rotate(-90deg)"});
        }

        if (tileToRight=="water-tile" && tileToLeft=="water-tile" && tileToTop=="water-tile") {
          $(this).data("land-type","beach-tile");
          $(this).css({"background-image":"url('img/beach-peninsula-tile.png')","transform": "rotate(90deg)"});
        }

        if (tileTopRight=="water-tile" && tileToTop!="water-tile" && tileToRight!="water-tile") {
          $(this).data("land-type","beach-tile");
          $(this).css({"background-image":"url('img/beach-diagonal-tile.png')","transform": "rotate(90deg)"});
        }


        if (tileTopLeft=="water-tile" && tileToTop!="water-tile" && tileToLeft!="water-tile") {
          $(this).data("land-type","beach-tile");
          $(this).css({"background-image":"url('img/beach-diagonal-tile.png')","transform": "rotate(0deg)"});
        }

        if (tileBottomRight=="water-tile" && tileToBottom!="water-tile" && tileToRight!="water-tile" && tileToTop!="water-tile") {
          $(this).data("land-type","beach-tile");
          $(this).css({"background-image":"url('img/beach-diagonal-tile.png')","transform": "rotate(180deg)"});
        }

        if (tileBottomLeft=="water-tile" && tileToBottom!="water-tile"  && tileToLeft!="water-tile" ) {
          $(this).data("land-type","beach-tile");
          $(this).css({"background-image":"url('img/beach-diagonal-tile.png')","transform": "rotate(-90deg)"});
        }

      }
    });}

    function normalizeBeach(){
      $( '.tile' ).each(function() {

        if ($(this).data("land-type")=="grass-tile") {
          var targetTile = $(this).data("coords");
          var xRight = getCoords($(this).data("coords"),"x")+1;
          var xLeft = getCoords($(this).data("coords"),"x")-1;
          var yDown = getCoords($(this).data("coords"),"y")+1;
          var yUp = getCoords($(this).data("coords"),"y")-1;
          var tileToRight = $('.tile[data-coords="'+xRight+','+getCoords($(this).data("coords"),"y")+'"]').data("land-type");
          var tileToLeft = $('.tile[data-coords="'+xLeft+','+getCoords($(this).data("coords"),"y")+'"]').data("land-type");
          var tileToTop = $('.tile[data-coords="'+getCoords($(this).data("coords"),"x")+','+yUp+'"]').data("land-type");
          var tileToBottom = $('.tile[data-coords="'+getCoords($(this).data("coords"),"x")+','+yDown+'"]').data("land-type");
          var tileTopLeft = $('.tile[data-coords="'+xLeft+','+yUp+'"]').data("land-type");
          var tileTopRight = $('.tile[data-coords="'+xRight+','+yUp+'"]').data("land-type");
          var tileBottomLeft = $('.tile[data-coords="'+xLeft+','+yDown+'"]').data("land-type");
          var tileBottomRight = $('.tile[data-coords="'+xRight+','+yDown+'"]').data("land-type");

          if (tileToTop=="water-tile" && tileToBottom=="water-tile") {
            $(this).data("land-type","water-tile");
            $(this).css("background-image", "url('img/water-tile.png')")
          }else{}
          if (tileToLeft=="water-tile" && tileToRight=="water-tile") {
            $(this).data("land-type","water-tile");
            $(this).css("background-image", "url('img/water-tile.png')")
          }else{}
        }});}

        function generateGrass(){
          $( '.tile' ).each(function() {
            var location = 0;
            var repositionX = 0;
            var repositionY = 0;
            var positionX = 0;
            var positionY =0;

            if ($(this).data("land-type")=="grass-tile") {
              location = $(this).position();
              repositionX = Math.floor((Math.random() * 15) + 10);
              repositionY = Math.floor((Math.random() * 15) + 10);

              positionX = location.left+repositionX;
              positionY = location.top+repositionY;

              $(".game-board").append("<img style='top:"+positionY+"px; left:"+positionX+"px; position:absolute; z-index:4; height:35px; width:35px; ' src=\"img/foliagepack/PNG/default/foliagePack_018.png\" class='grass'></div>");

            }
          })
        }
        function generateBush(){
          $( '.tile' ).each(function() {
            var location = 0;
            var repositionX = 0;
            var repositionY = 0;
            var positionX = 0;
            var positionY =0;

            if ($(this).data("land-type")=="grass-tile") {
              location = $(this).position();
              repositionX = Math.floor((Math.random() * 40) + 10);
              repositionY = Math.floor((Math.random() * 40) + 10);

              positionX = location.left+repositionX;
              positionY = location.top+repositionY;

              $(".game-board").append("<img style='top:"+positionY+"px; left:"+positionX+"px; position:absolute; z-index:4; height:35px; width:35px; ' src=\"img/foliagepack/PNG/Retina/foliagePack_020.png\" class='grass'></div>");

            }
          })
        }
        function generateRocks(){
          $( '.tile' ).each(function() {
            var posibility = Math.floor((Math.random() * 15) + 1);
            var location = 0;
            var repositionX = 0;
            var repositionY = 0;
            var positionX = 0;
            var positionY =0;

            if ($(this).data("land-type")=="grass-tile" && posibility =="15") {
              location = $(this).position();
              repositionX = Math.floor((Math.random() * 40) + 10);
              repositionY = Math.floor((Math.random() * 40) + 10);
              positionX = location.left+repositionX;
              positionY = location.top+repositionY;
              $(".game-board").append("<img style='top:"+positionY+"px; left:"+positionX+"px; position:absolute; z-index:5; height:108px; width:135px; ' src=\"img/foliagepack/PNG/Retina/foliagePack_057.png\" class='boulder'></div>");

            }
          })
        }
normalizeBeach();
beachGeneration();
        generateGrass();
        generateBush();
        generateRocks();
        $(".grass").on("click" , function(){
          $(this).remove();
          dialog("grass destroyed");
        });
        $('img').on('dragstart', function(event) { event.preventDefault(); });
        $('div').on('dragstart', function(event) { event.preventDefault(); });
        $('p').on('dragstart', function(event) { event.preventDefault(); });
        $('h1').on('dragstart', function(event) { event.preventDefault(); });
        $('h2').on('dragstart', function(event) { event.preventDefault(); });
      //  $('a').on('dragstart', function(event) { event.preventDefault(); });

  });
