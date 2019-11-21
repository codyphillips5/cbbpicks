var firtName = "";
var lastName = "";
var coversNum = [];
var coversTeam = [];

var standings, teams, resultsList, usersList;

var getPicks = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/games/week3_picks.json", function(json){
	standings = json;
});

var getStandings = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/teams.json", function(json){
	teams = json;
});

var getUsers= $.getJSON("https://codyphillips5.github.io/cbbpicks/json/users.json", function(json){
    usersList = json;
});

$.when(getPicks, getStandings, getUsers).then(function(){
	var tableStart = `<table class="table table-hover" id="results"><thead><tr><th scope="col">Name</th><th scope="col">Game 1</th><th scope="col">Game 2</th><th scope="col">Game 3</th><th scope="col">Game 4</th><th scope="col">Game 5</th><th scope="col">Game 6</th><th scope="col">Game 7</th><th scope="col">Game 8</th><th scope="col">Game 9</th><th scope="col">Game 10</th><th scope="col">Total</th></tr></thead><tbody>`;

	for (var key in standings) {
		for (var i = 0; i < standings[key].length; i++) {
			// set starters
			var pointTotal = 0;
			var isCorrect;

			var user = standings[key][i].userId;
			// get user info
			for (var k in usersList) {
				for (var j = 0; j < usersList[k].length; j++) {
						if (user == usersList[k][j].userId) {
							firstName = usersList[k][j].FirstName;
							lastName = usersList[k][j].LastName;
					}
				}
			}
			var tableUser = tableUser + `<tr><th>${firstName + " " + lastName}</th>`;
			// check user picks against results
			for (var pointTotals = 1; pointTotals <= 10; pointTotals++) {
				tableUser = tableUser + `<td>${standings[key][i]["game"+pointTotals]}</td>`;
			}
		}
	}
	tableUser = tableUser.replace("undefined","");
	var tableEnd = `</tbody></table>`;	
	document.getElementById("standings").innerHTML = tableStart + tableUser + tableEnd;
});