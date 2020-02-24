var firtName = "";
var lastName = "";
var coversNum = [];
var coversTeam = [];

var standings, usersList;

var getStandings = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/standings_end.json", function(json) {
		standings = json;
});
	
var getUsers= $.getJSON("https://codyphillips5.github.io/cbbpicks/json/users.json", function(json) {
		usersList = json;
});

$.when(getStandings, getUsers).then(function(){
	var tableStart = `<table class="table table-hover" id="standings-table"><thead><tr><th scope="col">Name</th><th scope="col" id='week 1'>Week 10</th><th scope="col" id='week 2'>Week 11</th><th scope="col" id='week 3'>Week 12</th><th scope="col" id='week 4'>Week 13</th><th scope="col" id='week 5'>Week 14</th><th scope="col" id='week 6'>Week 15</th><th scope="col" id='week 7'>Week 16</th><th scope="col" class="active">Total</th><th scope="col" class="active">Percent</th></tr></thead><tbody>`;

	for (var key in standings) {
		for (var i = 0; i < standings[key].length; i++) {
			
			// set starters
			var week = 16;
			var pointTotal = 0;
			var isTop;
			var weekTotal = 0;
			var seenot = "";

			var user = standings[key][i].userId;

			for (var k in usersList) {
				for (var j = 0; j < usersList[k].length; j++) {
						if (user == usersList[k][j].userId) {
							firstName = usersList[k][j].FirstName;
							lastName = usersList[k][j].LastName;
					}
				}
			}
			var tableUser = tableUser + `<tr><th>${firstName + " " + lastName}</th>`;

			for(var stand = 0; stand <= 7; stand++) {
				//tableUser = tableUser + `<td>${standings[key][i]["week_" + stand]}</td>`;
				pointTotal = pointTotal + standings[key][i]["week_" + stand];
				weekTotal++;
				if (stand == 0) {
					seenot = "hidden";
				}
				if(standings[key][i]["week_" + stand + "_top"]) {
					tableUser = tableUser + `<td class='success' id='week ${stand}' ${seenot}>${standings[key][i]["week_" + stand]}</td>`;
				}
				else {
					tableUser = tableUser + `<td id='week ${stand}' ${seenot}>${standings[key][i]["week_" + stand]}</td>`;
				}
				seenot = "";
			}
			//calculate score
			var perc = (pointTotal / (week * 10)) * 100
			tableUser = tableUser + `<td class="active">${pointTotal}</td>`;
			tableUser = tableUser + `<td class="active"> ${perc.toFixed(2)}%</td></tr>`;

		}
	}
	tableUser = tableUser.replace("undefined","");
	var tableEnd = `</tbody></table>`;	
	document.getElementById("standings").innerHTML = tableStart + tableUser + tableEnd;
	sortTable(weekTotal + 1);
});

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("standings-table");
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
