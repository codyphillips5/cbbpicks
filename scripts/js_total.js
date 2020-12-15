var homeTeams = [];
var awayTeams = [];
var coverTeams = [];
var allTeams = [];
var winners = [];
var home, away, cover, week, game;
var games = false;

var standings, teams, resultsList, usersList;
game = 0;
week = 4;

for (var i = 1; i <= week; i++) {
	var getGames = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/games/week" + i + ".json", function(json){
		standings = json;
		
		for (var key in standings) {
			for (var i = 0; i < standings[key].length; i++) {
				if (standings[key][i].cover !== undefined) {
					home = standings[key][i].homeTeam;
					away = standings[key][i].awayTeam;
					cover = standings[key][i].cover;
					homeTeams.push(home);
					awayTeams.push(away);
					coverTeams.push(cover);					
				}
			}
		}
	});
}

var getTeams = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/teams.json", function(json){
	teams = json;
});

var getTourney = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/tournament.json", function(json){
	tourney = json;
	for (var auto in tourney) {
		for (var i = 0; i < tourney[auto].length; i++) {
			winners.push(tourney[auto][i].winner);
		}
	}
});


$.when(getGames, getTeams, getTourney).then(function(){
	console.log("cover: " + coverTeams.length);
	game = coverTeams.length - ((week-1)*10);
	
	if (game < 0) {
		location.reload();
	}
	else {
		if (game == 0) {
			game = 10;
			week = week - 1;
		}		
		
		allTeams = homeTeams.concat(awayTeams);
		allTeams = numbers(allTeams);
		
		document.getElementById("records").innerHTML = `<li>Records reflected through Game ${game} of Week ${week}.</li>`;

		coverTeams = numbers(coverTeams);
		
		var tableStart = `<div class="table-responsive"><table class="table table-bordered table-hover" id="results"><thead><tr><th scope="col">Team</th><th scope="col">Games</th><th scope="col">ATS Record</th><th scope="col">Cover %</th></tr></thead><tbody>`;
		
		for (var team in teams) {
			for (var j = 0; j < allTeams[0].length; j++) {
				// set starters
				var guess = allTeams[0][j];
				var color = "";
				var percColor = "";
				switch(allTeams[1][j]) {
					case 9:
					case 7:
					case 5:
					case 3:
					case 1:
						color = "active";
						break;
					case 8:
					case 6:
					case 4:
					case 2:
						color = "";
						break;
					default:
						// code block
				}
				
				var wins = 0;
				var losses = 0;
				var perc;
				if (coverTeams[0].includes(allTeams[0][j])) {
					const isSameNumber = (element) => element == allTeams[0][j];
					var spot = coverTeams[0].findIndex(isSameNumber);
					wins = coverTeams[1][spot];
					losses = allTeams[1][j] - wins;
				}
				else {
					losses = allTeams[1][j];
				}
				
				perc = (wins / (wins + losses)) * 100;
				if (perc >= 75.0) {
					percColor = "success";
				}
				else if (perc < 75.0 && perc >= 40.0) {
					percColor = "warning";
				}
				else if (perc < 40.0) {
					percColor = "danger";
				}
				else {
					percColor = color;
				}
				
				if (winners.includes(teams[team][guess].team)) {
					color = "table-warning";
				}
				tableStart = tableStart + `<tr><td class="${color}">${teams[team][guess].team}</td><td class="${color}">${allTeams[1][j]}</td><td class="${color}">${wins}-${losses}</td><td class="${percColor}">${perc.toFixed(1)}</td>`;
			}
		}
		var tableEnd = `</tbody></table>`;	
		document.getElementById("standings").innerHTML = tableStart + tableEnd;
		sortTable(4);
		sortTable(2);		
	}
});


function numbers(arr) {
    var a = [], b = [], prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }

    return [a, b];
}

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("results");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "desc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n-1];
      y = rows[i + 1].getElementsByTagName("TD")[n-1];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}