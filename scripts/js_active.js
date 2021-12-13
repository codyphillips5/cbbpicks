const arrayActive = []; 

// week of year, first game
var week = 6;

var xFile, yFile;

var requestX = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/games/week" + week +".json", function(json){
	xFile = json;
});

var requestY = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/teams.json", function(json){
	yFile = json;
});

$.when(requestX, requestY).then(function(){
	for (var key in xFile) {
		for (var i = 0; i < xFile[key].length; i++) {
			var gameId = xFile[key][i].gameId;
			var active = xFile[key][i].active;
			// set home team values
			if (active) {
				arrayActive.push(gameId);
			}
		}
	}
});