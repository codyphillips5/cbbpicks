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

const arrayActive = []; 
  
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
var coversTeam = [];
var overtime = "";
var numOT = "";
  
// week of year, first game
var week = 0;
if (week === 0) {
	document.getElementById("week-title").innerHTML = `<h2>🏀 Enjoy the Madness 🏀</h2>`;
	document.getElementsByClassName("picks container pt-3")[0].setAttribute("hidden", "");
	document.getElementById("games-section").innerHTML = `<a class="p-2 bg-light border" href="standings.html">Standings</a><a class="p-2 bg-light border" href="totals.html">Sabermetrics</a>`;
}
else if (week === 4) {
	document.getElementById("week-title").innerHTML = `<h2>🦃 Feast Week 🦃</h2>`;
}
else if (week === 8) {
	document.getElementById("week-title").innerHTML = `<h2>🎅 Week 8 🎄</h2>`;
}
else {
	document.getElementById("week-title").innerHTML = `<h2>Week ${week}</h2>`;
}

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
			var foxId = xFile[key][i].foxId;
			// set home team values
			var home = xFile[key][i].homeTeam;
			for (var k in yFile) {
				for (var j = 0; j < yFile[k].length; j++) {
					if(home == yFile[k][j].teamValue) {
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
					if(away == yFile[k][j].teamValue) {
						awayTeam = yFile[k][j].team;
						awayTeamVal = yFile[k][j].teamValue;
						awayTeamMascot = yFile[k][j].teamMascot;
						awayTeamImage = yFile[k][j].teamImage;
					}
				}
			}
			var spread = xFile[key][i].spread;
			var fav = xFile[key][i].favorite;
			var active = xFile[key][i].active;
			var activeBg = "light";
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
			if (active) {
				var activeDate = new Date(xFile[key][i].gameTime);
				arrayActive.push(gameId);
				activeBg = "style='background-color: #e3f2fd;'";
			}
			//badge.className = 'games-layout';
			//badge.id = 'games-layout';
			var header = `<div class='p-3 border bg-${activeBg}' ${activeBg}><span class='header'><h5 class='pb-2 lh-1' style='margin-bottom: 0px;'>${awayTeam} vs ${homeTeam} (${homeSide}${spread}) </h5>`;
			var time =date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/^0+/, '');
			var gameInfo = '<small class=\'w-100\'> '+ channel + " • " + date.toLocaleString([], {weekday: 'long', month: '2-digit', day: '2-digit'}).replace(',',' •') + ', ' + time + '</small>';
			var fin = '';

			if (xFile[key][i].cover) {
				if (xFile[key][i].cover == home) {
					var awayScore = `<span class="teamlistfinal"><span class="p-2"><img src="https://b.fssta.com/uploads/application/college/team-logos/${awayTeamImage}.vresize.50.50.medium.2.png" width="25" height="25"><span class="p-1" id="away">${awayTeam} ${awayTeamMascot} - ${xFile[key][i].awayScore} </span></span> </span>`
					var homeScore = `<span class="teamlistfinal"><span class="p-2"><img src="https://b.fssta.com/uploads/application/college/team-logos/${homeTeamImage}.vresize.50.50.medium.2.png" width="25" height="25"><span class="p-1" id="home">${homeTeam} ${homeTeamMascot} - ${xFile[key][i].homeScore} 💰 </span></span> </span>`
				}
				else if (xFile[key][i].cover == away) {
					var awayScore = `<span class="teamlistfinal"><span class="p-2"><img src="https://b.fssta.com/uploads/application/college/team-logos/${awayTeamImage}.vresize.50.50.medium.2.png" width="25" height="25"><span class="p-1" id="away">${awayTeam} ${awayTeamMascot} - ${xFile[key][i].awayScore} 💰 </span></span> </span>`
					var homeScore = `<span class="teamlistfinal"><span class="p-2"><img src="https://b.fssta.com/uploads/application/college/team-logos/${homeTeamImage}.vresize.50.50.medium.2.png" width="25" height="25"><span class="p-1" id="home">${homeTeam} ${homeTeamMascot} - ${xFile[key][i].homeScore}</span></span> </span>`
				}
				select = awayScore + homeScore + "</span>";
				gameInfo = '';
				if (xFile[key][i].overtime) {
					if (xFile[key][i].numberOfOT > 1) {
						numOT = xFile[key][i].numberOfOT.toString();
						numOT = `(${numOT})`;
					}
					fin = `<sub><b>FINAL / OT ${numOT}</b></sub>`;
				}
				else {
					fin = '<sub><b>FINAL</b></sub>';
				}
				var yourPick = document.createElement('div');
				yourPick.id = 'your-pick-game' + gameId;
				yourPick.innerHTML = '';
			}
			else if (spread == "-") {
				var select = '';	
			}
			else {
				if (active) {
					console.log("active " + foxId);
					if (date1.getTime() <= date.getTime()) {
						var select = '<select class=\'teamlist form-select form-select-sm\' style=\'width:auto;\' id=\'game' + gameId + '\' onchange=\"assignPointsByTeam(' + gameId +');\"><option value = \"\"> -- Select Team -- </option><option value=\"' + awayTeamVal + '\">' + awayTeam + ' ' + awaySide + spread + '</option><option value=\"' + homeTeamVal + '\">' + homeTeam + ' ' + homeSide + spread + '</option></select>'; 	
					}
					else {
						var select = `<div class="d-grid gap-2"><a href="#" onclick='window.open("https://www.foxsports.com/college-basketball/boxscore?id=${foxId}&tab=boxscore");return false;'><button type="button" class="btn btn-link pb-2 pt-2">Boxscore</button></a></div>`;
					}
				}
				else {
					var select = '';
				}
			}
			badge.innerHTML = '<form>' + header + gameInfo + select + fin + '</form></div>';
			document.getElementById(key).appendChild(badge);
			//document.getElementsByClassName(badge.id)[i].appendChild(yourPick);
		}
		
		// set first game of the day
		var firstSet = [];
		var first = 0;

		for(var i = 1; i < 11; i++) {
			if(typeof xFile[key][i-1].cover == 'undefined'){
				if (first == 0)
					first = i;
			}
			if (!arrayActive.includes(i)) {	
				var element = document.getElementById('game-' + i);
				element.classList.add("bg-light");
			}
		}
		arrayActive.forEach(myFunction);
		active = xFile[key][first - 1].active;
	}
	
	console.log(activeDate);
  
	// if current time is after start time of first game, lock
	if (active !== undefined && !active) {
		document.getElementById("saver").innerHTML = `<button type="submit" id="savePicks" disabled class='btn btn-primary'>Lines Not Locked</button>`;
	}
	else {
		if (date1.getTime() > activeDate.getTime()) {
			document.getElementById("saver").innerHTML = `<button type="submit" disabled id="savePicks" class='btn btn-primary'>Picks Locked</button>`;
		}
		else {
			document.getElementById("saver").innerHTML = `<button type="submit" id="savePicks" class='btn btn-primary'>Save My Picks</button>`;
		}
	}
	console.log(document.getElementById('seasongame2').value);	
});
  
var request;

function assignPointsByTeam(id) {
	var pick = document.getElementById("game" + id);
	var userPick = pick.options[pick.selectedIndex].value;
	var fullTeamName = pick.options[pick.selectedIndex].text;
	fullTeamSpread = fullTeamName.replace(/[^\d+.-]/g, '');
	game.team = userPick;
	document.getElementById("seasongame" + id).value = game.team;
	document.getElementById("label-choice-seasongame" + id).innerHTML = `<label for="${id}" class="choice pb-1">${game.team} ${fullTeamSpread}</label>`;
	getTeamInfo(userPick);

	request.success(function(response){
		game.spread = attempt.thisTeamImg;
		document.getElementById("image" + id).innerHTML = `<img src="https://b.fssta.com/uploads/application/college/team-logos/${game.spread}.vresize.200.200.medium.2.png">`;
	});
	document.getElementById("seasongame" + id).value = game.team;
	console.log(document.getElementById("seasongame" + id));
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

function myFunction(arrayValues) {
	const note = document.querySelector('#game-' + arrayValues);
	note.style.backgroundColor = '#e3f2fd';
}