var game = {
	team: "",
	spread : "",
	pts : "",
	game : "" 
};

attempt = {
	  thisTeam : "",
	  thisMascot : "",
	  thisTeamAbb : "",
	  thisTeamImg : ""
};
  
var gameId = "";
var home = "";
var homeTeam = "";
var homeTeamVal = "";
var homeTeamMascot = "";
var homeTeamImage = "";
var away = "";
var awayTeam = "";
var awayTeamVal = "";
var spread = "";
var fav ="";
var homeSide = "";
var awaySide = "";
var required = "";
var gog = "";
  
// week of year, first game
var week = 7;
document.getElementById("week-title").innerHTML = `<h2>Week ${week}</h2>`;

var xFile, yFile;

var requestX = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/games/week" + week +".json", function(json){
	xFile = json;
});

var requestY = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/teams.json", function(json){
	yFile = json;
});

var date1 = new Date();

$.when(requestX, requestY).then(function(){
	console.log(firebase.auth().currentUser);
	for (var key in xFile) {
		for (var i = 0; i < xFile[key].length; i++) {
			var gameId = xFile[key][i].gameId;
			// set home team values
			var home = xFile[key][i].homeTeam;
			for (var k in yFile) {
				for (var j = 0; j < yFile[k].length; j++) {
					if(home == yFile[k][j].teamId) {
						homeTeam = yFile[k][j].team;
						homeTeamVal = yFile[k][j].teamValue;
						homeTeamMascot = yFile[k][j].teamMascot;
						homeTeamImage = yFile[k][j].teamImage;
					}
				}
			}
			// set away team values 
			var away = xFile[key][i].awayTeam;
			for (var k in yFile) {
				for (var j = 0; j < yFile[k].length; j++) {
					if(away == yFile[k][j].teamId) {
						awayTeam = yFile[k][j].team;
						awayTeamVal = yFile[k][j].teamValue;
						awayTeamMascot = yFile[k][j].teamMascot;
						awayTeamImage = yFile[k][j].teamImage;
					}
				}
			}
			var spread = xFile[key][i].spread;
			var fav = xFile[key][i].favorite;
			var homeSide = "-";
			var awaySide = "+";
			var channel = xFile[key][i].channel;
			var date = new Date(xFile[key][i].gameTime);
			var badge = document.createElement('div');
			if (fav != home) {
			  homeSide = "+";
			  awaySide = "-";		
			}
			if (spread == 0) {
			  homeSide = "";
			  awaySide = "";
			  spread = "PK";
			}
			badge.className = 'games-layout';
			badge.id = 'games-layout';
			var header = '<span class=\'header\'><h4>' + awayTeam + ' vs ' + homeTeam + ' (' + homeSide + spread + ') </h4>';
			var gameInfo = '<sub> '+ channel + " · " + date.toLocaleString([], {weekday: 'long', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).replace(',',' ·') + '</sub><br>';
			var fin = '';

			if (xFile[key][i].cover) {
				var awayScore = `<br><img src="https://b.fssta.com/uploads/content/dam/fsdigital/fscom/global/dev/static_resources/cbk/teams/retina/${awayTeamImage}.vresize.25.25.medium.2.png"> ${awayTeam} ${awayTeamMascot} - ${xFile[key][i].awayScore}`
				var homeScore = `<br> <img src="https://b.fssta.com/uploads/content/dam/fsdigital/fscom/global/dev/static_resources/cbk/teams/retina/${homeTeamImage}.vresize.25.25.medium.2.png"> ${homeTeam} ${homeTeamMascot} - ${xFile[key][i].homeScore}`
				if (xFile[key][i].cover == home)
				homeScore = `${homeScore}   <span style="color:green" class="glyphicon glyphicon-piggy-bank"></span>`;
				else if (xFile[key][i].cover == away)
				  awayScore = `${awayScore}   <span style="color:green" class="glyphicon glyphicon-piggy-bank"></span>`;
				select = awayScore + homeScore;
				gameInfo = '';
				fin = '<br><sub><b>FINAL</b></sub>';
				var yourPick = document.createElement('div');
				yourPick.id = 'your-pick-game' + gameId;
				yourPick.innerHTML = '';
			}
			else if (spread == "-") {
				var select = '';	
			}
			else {
				var select = '<br><select class=\'teamlist\' id=\'game' + gameId + '\' onchange=\"assignPointsByTeam(' + gameId +');\"><option value = \"\"> -- Select Team -- </option><option value=\"' + awayTeamVal + '\">' + awayTeam + ' ' + awaySide + spread + '</option><option value=\"' + homeTeamVal + '\">' + homeTeam + ' ' + homeSide + spread + '</option></select>'; 	
			}
			badge.innerHTML = '<form>' + header + gameInfo + select + fin + '</form>';
			document.getElementById(key).appendChild(badge);
			//document.getElementsByClassName(badge.id)[i].appendChild(yourPick);
		}
		// set first game of the day
		var first = 1;
		var date2 = new Date(xFile[key][first - 1].gameTime);
		var active = xFile[key][first - 1].active;
		console.log(date2);
		console.log(active);
	}
  
	// if current time is after start time of first game, lock
	if (active !== undefined && !active) {
		document.getElementById("saver").innerHTML = `<button type="submit" id="savePicks" disabled class='btn btn-primary'>Lines Not Locked</button>`;
	}
	else {
		if (date1.getTime() > date2.getTime()) {
			document.getElementById("saver").innerHTML = `<button type="submit" disabled id="savePicks" class='btn btn-primary'>Picks Locked</button>`;
		}
		else {
			document.getElementById("saver").innerHTML = `<button type="submit" id="savePicks" class='btn btn-primary'>Save My Picks</button>`;
		}
	}/**/
});
  
var request;

function assignPointsByTeam(id) {
	var pick = document.getElementById("game" + id);
	var userPick = pick.options[pick.selectedIndex].value;
	var fullTeamName = pick.options[pick.selectedIndex].text;
	fullTeamSpread = fullTeamName.replace(/[^\d+.-]/g, '');
	game.team = userPick;
	document.getElementById("seasongame" + id).value = game.team;
	document.getElementById("label-choice-seasongame" + id).innerHTML = `<label for="${id}" class="choice">${game.team} ${fullTeamSpread}</label>`;
	getTeamInfo(userPick);

	request.success(function(response){
		game.spread = attempt.thisTeamImg;
		document.getElementById("image" + id).innerHTML = `<img src="https://b.fssta.com/uploads/content/dam/fsdigital/fscom/global/dev/static_resources/cbk/teams/retina/${game.spread}.vresize.200.200.medium.2.png">`;
		for (i = 0; i < choices.length; i++) {
		  // only allow a team to be chosen once
			if (game.team == choices[i].teamAbb) {
				choices[i].teamAbb = "";
				choices[i].fullTeam = "";
				//document.getElementById(choices[i].pts).value = "";
				document.getElementById("label-choice-" + choices[i].pts).innerHTML = `<label for="${choices[i].pts}" class="choice"></label>`;
				document.getElementById("image" + choices[i].pts).innerHTML = ``;
			}
			if (id == choices[i].pts) {
				if(choices[i].teamAbb != "") {
					console.log("game.game = " + game.game);
					if(choices[i].game != game.game) {
						var inputs = document.getElementById("point_totals_game_" + choices[i].game).getElementsByTagName("input");
						for (j = 0; j < inputs.length; j++) {
							inputs[j].checked = false;
						}
					}
				}
				// The request is done, and we can do something else
				choices[i].teamAbb = userPick;
				choices[i].fullTeam = fullTeamName;
				choices[i].game = id;
				choices[i].spread = attempt.thisTeamImg;
				console.log("logo: " + choices[i].spread);
				document.getElementById("image" + id).innerHTML = `<img src="https://b.fssta.com/uploads/content/dam/fsdigital/fscom/global/dev/static_resources/cbk/teams/retina/${choices[i].spread}.vresize.200.200.medium.2.png">`;
				game.game = id;
			}
		}
	});
	document.getElementById("seasongame" + id).value = game.team;
}

function setTeam(element) {
	game.team = element.value;
}

function getTeamInfo(teamId) {
	request = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/teams.json", function(team) {
		for (var key in team) {
			for (var i = 0; i < team[key].length; i++) {
				if(team[key][i].teamValue == teamId){
					attempt.thisTeam = team[key][i].team;
					attempt.thisTeamAbb = team[key][i].teamValue;
					attempt.thisTeamImg = team[key][i].teamImage;
				}
			}
		}
	});	
}