var homeTeams = [];
var awayTeams = [];
var allTeams = [];
var winners = [];
var home, away;

var standings, teams, resultsList, usersList;

for (var i = 1; i <= 18; i++) {
	var getGames = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/games/week" + i + ".json", function(json){
		standings = json;
		
		for (var key in standings) {
			for (var i = 0; i < standings[key].length; i++) {
				home = standings[key][i].homeTeam;
				away = standings[key][i].awayTeam;
				homeTeams.push(home);
				awayTeams.push(away);
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
	allTeams = homeTeams.concat(awayTeams);
	console.log("home: " + homeTeams.length);
	console.log("away: " + awayTeams.length);
	console.log("all: " + allTeams.length);
	allTeams = numbers(allTeams);
	
	var tableStart = `<table class="table table-hover" id="results"><thead><tr><th scope="col">Team</th><th scope="col">Games</th></tr></thead><tbody>`;
	
	for (var team in teams) {
		for (var j = 0; j < allTeams[0].length; j++) {
			// set starters
			var guess = allTeams[0][j];
			var color = "";
			switch(allTeams[1][j]) {
				case 9:
				case 7:
				case 5:
				case 3:
				case 1:
					color = "table-active";
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
			if (winners.includes(teams[team][guess].team)) {
				color = "table-warning";
			}
			tableStart = tableStart + `<tr><th class="${color}">${teams[team][guess].team}</th><th class="${color}">${allTeams[1][j]}</th>`;
		}
	}
	var tableEnd = `</tbody></table>`;	
	document.getElementById("standings").innerHTML = tableStart + tableEnd;
	sortTable(2);
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
      x = rows[i].getElementsByTagName("TH")[n-1];
      y = rows[i + 1].getElementsByTagName("TH")[n-1];
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