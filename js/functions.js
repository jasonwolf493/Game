//Global functions

//you guessed it this is the dialog output. this will display info to the player
function dialog(output){
  var d = new Date();
  var n = d.getTime();
  console.log(n);
  console.log(n);
  console.log(n);
  $('.dialog').finish();
  dialogBoxHeight = $('.dialog').css("height").replace(/\D/g,'');
  dialogBoxHeight = Number(dialogBoxHeight);
  dialogBoxHeight = dialogBoxHeight+35;
  $(".dialog").append("<p class='dialog-text' data-dialog='"+n+"'  style='opacity:0; color:white; position:relative; top:35px; font-family:arial; padding:5px; border-radius:5px; background-color:rgba(0,0,0,0.8); margin-bottom:5px; line-height:130%;'>"+output+"</p>")
  $('.dialog-text[data-dialog="'+n+'"]').animate({"opacity": "1","top": "5px"},300,function(){});

  $('.dialog').animate({height: dialogBoxHeight},300,function(){});
  $('.dialog-text[data-dialog="'+n+'"]').animate({opacity: 1},300,function(){});
  setTimeout(function(){
    console.log("after");
    $('.dialog-text[data-dialog="'+n+'"]').animate({opacity: 0},900,function(){
      $('.dialog-text[data-dialog="'+n+'"]').remove();
      dialogBoxHeight = dialogBoxHeight-35;
      $('.dialog').animate({height: dialogBoxHeight},0,function(){});
      console.log(dialogBoxHeight);
    });

  },5000);
}




$( window ).on('load', function() {



  // $(".game-board").append("<div class='tile' data-coords='"+X+","+Y+"' style=' background-color:blue; float:left; height:"+tileSize+"px; width:"+tileSize+"px; background-image: url(\"img/water-tile.png\");'></div>");
  // $('.tile[data-coords="'+X+','+Y+'"]').data("land-type","water-tile");




  //Loading screen
  $(".main-loading").find("h1").css("animate", "unset");
  $(".main-loading").find("h1").css("-webkit-animation", "unset");
  $(".main-loading").find("h1").animate({opacity: 0, top:-100}, 500);
  $(".main-loading").find("h2").animate({opacity: 0, top: 200}, 800);
  $(".main-loading").animate({opacity: 0}, 800, function(){$(".main-loading").css("display", "none");$(".actions-bar").css("display", "inline-block");});



//Set cursor
  $("html").css( 'cursor', 'url(img/uipack-rpg/PNG/cursorHand_beige.png), auto' );
  $("a").on("hover", function(){
    $(this).css( 'cursor', 'url(img/uipack-rpg/PNG/cursorHand_beige.png), auto' );
  });

  //make map draggable
  function handle_mousedown(e){
    if ( event.which == 2 ){      window.my_dragging = {};
          my_dragging.pageX0 = e.pageX;
          my_dragging.pageY0 = e.pageY;
          my_dragging.elem = this;
          my_dragging.offset0 = $(this).offset();
          function handle_dragging(e){
              var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
              var top = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);
              $(my_dragging.elem)
              .offset({top: top, left: left});
          }
          function handle_mouseup(e){
              $('body')
              .off('mousemove', handle_dragging)
              .off('mouseup', handle_mouseup);
          }
          $('body')
          .on('mouseup', handle_mouseup)
          .on('mousemove', handle_dragging);}

  }
  $('.game-board').mousedown(handle_mousedown);



  //sound testing
  var musicVolume = 0.0;
  var soundEffectsVolume = 0.0;
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




//get location of gameboard. needs to be cleaned probably dont need gameboard anymore since we drag
  function locationParse(returnWhat){

    var top = $(".game-board").css("top");
    var left = $(".game-board").css("left");
    var playerTop = $(".player").css("top");
    var playerLeft = $(".player").css("left");
    switch (returnWhat) {
      case "playerLocationLeft":
        var playerLocationLeft = playerLeft.indexOf("p");
        var cleanedPx = playerLeft.substr(0,playerLocationLeft);
        playerLocationLeft = parseInt(cleanedPx);
        console.log(playerLocationLeft);
        return playerLocationLeft;
        break;

      case "playerLocationTop":
        var playerLocationTop = playerTop.indexOf("p");
        var cleanedPx = playerTop.substr(0,playerLocationTop);
        playerLocationTop = parseInt(cleanedPx);
        console.log(playerLocationTop);
        return playerLocationTop
        break;

      case "gameBoardTop":
        var gameBoardTop = top.indexOf("p");
        var cleanedPx = top.substr(0,gameBoardTop);
        gameBoardTop = parseInt(cleanedPx);
        console.log(gameBoardTop);
        return gameBoardTop;
        break;

      case "gameBoardLeft":
        var gameBoardLeft = left.indexOf("p");
        var cleanedPx = left.substr(0,gameBoardLeft);
        gameBoardLeft = parseInt(cleanedPx);
        console.log(gameBoardLeft);
        return gameBoardLeft;
        break;
      default:

    }



  }
  var playerLocationTop = locationParse("playerLocationTop");
  var playerLocationLeft = locationParse("playerLocationLeft");
  var gameBoardLeft = locationParse("gameBoardLeft");
  var gameBoardTop = locationParse("gameBoardTop");



  // $( "html" ).keydown(function( event ) {
  //   top = $(".game-board").css("top");
  //   left = $(".game-board").css("left");
  //   playerTop = $(".player").css("top");;
  //   playerLeft = $(".player").css("left");;
  //
  //
  // });




//Arrow Key controls
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

  if ( event.which == 38) {
    gameBoardTop = gameBoardTop+2;
    playerLocationTop--;
    if ($(".actions-box").css("display")=="none") {
      // $(".game-board").css("top", gameBoardTop);
      $(".player").css("top", playerLocationTop);


    }else{

    }
  }});
  $( "html" ).keyup(function( event ) {

  if ( event.which == 38) {


    }else{

    }
  });

  $( "html" ).keydown(function( event ) {

  if ( event.which == 40) {
    gameBoardTop--;
    playerLocationTop++;
    if ($(".actions-box").css("display")=="none") {
      $(".player").css("top", playerLocationTop);

    }else{

    }
  }});

  $( "html" ).keydown(function( event ) {

    if ( event.which == 37) {
      gameBoardLeft++;
      playerLocationLeft--;
    if ($(".actions-box").css("display")=="none") {
      $(".player").css("left", playerLocationLeft);

    }else{

    }
  }});
  $( "html" ).keydown(function( event ) {
    if ( event.which == 39) {
      gameBoardLeft--;
      playerLocationLeft++;
    if ($(".actions-box").css("display")=="none") {
      $(".player").css("left", playerLocationLeft);

    }else{

    }
  }});





  $(".actions-close").on("click",function(){
    $(".actions-box").toggle("display");
    openReverse.play();
  })

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
  $(".settings-close").on("click",function(){
    $(".settings-menu").toggle("display");
    openReverse.play();
  })


  $( "html" ).contextmenu(function() {
    event.preventDefault();
  });




  $(".music-volume").mousemove(function(){
    $(".music-label").replaceWith("<p class='music-label'>Music Volume: "+$(this).val()+"%</p>");
    theme.volume = $(this).val()/100;

  });
  $(".sound-effects-volume").mousemove(function(){
    $(".sound-effects-label").replaceWith("<p class='sound-effects-label'>Sound Effects Volume: "+$(this).val()+"%</p>");
    soundEffectsVolume = $(this).val()/100;
    selection.volume = $(this).val()/100;
    open.volume = $(this).val()/100;
    openReverse.volume = $(this).val()/100;

  });








  //tile generation / board builder
  var tileSize = 64;
  var boardWidth = 35;
  var boardHeight = 35;
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
