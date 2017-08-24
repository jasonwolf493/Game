$( window ).on('load', function() {

  //Loading screen
  $(".main-loading").find("h1").css("animate", "unset");
  $(".main-loading").find("h1").css("-webkit-animation", "unset");
  $(".main-loading").find("h1").animate({opacity: 0, top:-100}, 500);
  $(".main-loading").find("h2").animate({opacity: 0, top: 200}, 800);
  $(".main-loading").animate({opacity: 0}, 800, function(){$(".main-loading").css("display", "none");});





  //sound testing
  var musicVolume = 0.0;
  var soundEffectsVolume = 1;
  var move = 0;
  var theme = new Audio('sound/theme.mp3');
  var open = new Audio('sound/open-menu.wav');
  var openReverse = new Audio('sound/open-menu-reverse.wav');
  var selection = new Audio('sound/selection.wav');
  selection.volume = soundEffectsVolume;
  open.volume = soundEffectsVolume;
  openReverse.volume = soundEffectsVolume;
  theme.volume = musicVolume;
  theme.play();


  $( "html" ).keydown(function( event ) {
  if ( event.which == 38 && move != 0) {
    if ($(".actions-box").css("display")=="none") {

    }else{
      move = move-16;
      $(".pointer").css("top",move);
      selection.play();
      event.preventDefault();
    }


  }});
  $( "html" ).keydown(function( event ) {
  if (event.which == 40 && move < 60) {
    if ($(".actions-box").css("display")=="none") {

    }else{
      move = move+16;
      $(".pointer").css("top",move);
      selection.play();
      event.preventDefault();
    }


  }});
  $( "html" ).keydown(function( event ) {
  if (event.which ==73) {
    if ($(".actions-box").css("display")=="none") {
      open.play();
    }else {
      openReverse.play();
    }
    $(".actions-box").toggle("display");

    event.preventDefault();

  }});
  //Settings

  $(".settings").click(function(){
    if ($(".settings-menu").css("display")=="none") {
      open.play();
    }else {
      openReverse.play();
    }
    $(".settings-menu").toggle("display");

  });
  $( "html" ).keydown(function( event ) {
  if (event.which == 27) {
    if ($(".settings-menu").css("display")=="none") {
      open.play();
    }else {
      openReverse.play();
    }
    $(".settings-menu").toggle("display");
    event.preventDefault();

  }});







  //tile generation / board builder
  var tileSize = 64;
  var boardWidth = 10;
  var boardHeight = 10;
  var numberOfTiles = boardWidth*boardHeight;
  $(".game-board").css("width", tileSize*boardWidth);
  $(".game-board").css("height", tileSize*boardHeight);











  // increment these with for statment

  for (Y = 1; Y <= boardHeight; Y++) {
    var X = 1;
    for (X; X <= boardWidth; X++) {
      // $(".game-board").append("<div class='tile' data-land-type='water-tile' data-coords='"+X+","+Y+"' style=' background-color:blue; float:left; height:32px; width:32px; background-image: url(\"img/water-tile.png\");'></div>");
      $(".game-board").append("<div class='tile' data-coords='"+X+","+Y+"' style=' background-color:blue; float:left; height:"+tileSize+"px; width:"+tileSize+"px; background-image: url(\"img/water-tile.png\");'></div>");
      $('.tile[data-coords="'+X+','+Y+'"]').data("land-type","water-tile");
       var coords = X+","+Y;
      // $('.tile[data-coords="'+X+','+Y+'"]').data("data-coords", X","Y);
    }
  }

  //display tile data on hover
  $(".tile").click( function(){console.log($(this).data("coords"));})
  $(".tile").click( function(){console.log($(this).data("land-type"));})

  //generate random location for land to begin
  var landStart = Math.floor((Math.random() * boardWidth/3) + 1) + "," + Math.floor((Math.random() * boardHeight/3) + 1);
  $('.tile[data-coords="'+landStart+'"]').css("background-image","url('img/grass-tile.png')");
  $('.tile[data-coords="'+landStart+'"]').data("land-type","grass-tile");

  //generate more land fading out over time
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
  //getCoords(landStart);


  function landGeneration(x,y,multiplier){
    var chanceDecrease = 100;
    var chanceForXincrease;
    x = x+1;
    y = y+multiplier;
    for (chanceDecrease; chanceDecrease > 0; chanceDecrease--) {


      chanceForXincrease = Math.floor((Math.random() * chanceDecrease) + 50);
      if (chanceForXincrease > 50) {
        chanceDecrease = chanceDecrease-5;
        $('.tile[data-coords="'+x+','+y+'"]').css("background-image","url('img/grass-tile.png')");
        $('.tile[data-coords="'+x+','+y+'"]').data("land-type","grass-tile");
        x++;
      }else {
        chanceDecrease = 0;

      }
      //x = x+1;

    }


    y++
    x = x -10;
    chanceDecrease = 100;
    for (chanceDecrease; chanceDecrease > 0; chanceDecrease--) {
      chanceForXincrease = Math.floor((Math.random() * chanceDecrease) + 50);
      if (chanceForXincrease > 50) {
        chanceDecrease = chanceDecrease-10;
        $('.tile[data-coords="'+x+','+y+'"]').css("background-image","url('img/grass-tile.png')");
        $('.tile[data-coords="'+x+','+y+'"]').data("land-type","grass-tile");
        x++;
      }else {
        chanceDecrease = 0;

      }
      //x = x+1;

    }
    // x = x+1;
    // $('.tile[data-coords="'+x+','+y+'"]').css('background-color', 'green');
    // console.log('.tile[data-coords="'+x+1+','+y+'"]');
  }
  var landMass = 50;
  for (var i = 0; i < landMass; i++) {
    landGeneration(getCoords(landStart,"x"),getCoords(landStart,"y"),i);
  }


//Logic for creating beaches



// destroy testing


});
