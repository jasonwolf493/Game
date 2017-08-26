var musicVolume = 0.0;
var soundEffectsVolume = 0.0;



var theme = new Audio('sound/theme.mp3');
var open = new Audio('sound/open-menu.wav');
var openReverse = new Audio('sound/open-menu-reverse.wav');
var selection = new Audio('sound/selection.wav');

selection.volume = soundEffectsVolume;
open.volume = soundEffectsVolume;
openReverse.volume = soundEffectsVolume;
theme.volume = musicVolume;
theme.play();
