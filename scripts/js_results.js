var firtName = "";
var lastName = "";
var allEntries = [];
var allGameOne = [];
var allGameTwo = [];
var allGameThree = [];
var allGameFour = [];
var allGameFive = [];
var allGameSix = [];
var allGameSeven = [];
var allGameEight = [];
var allGameNine = [];
var allGameTen = [];
var allUsers = [];
var allFirst = [];
var allLast = [];
var storeUsers = [];
var coversNum = [];
var userPickTeams = [];
var coversArr = [""];
var weekNum = 6;
var weekList = "";
var isCorrect;
var isMe;
var date1 = new Date();
var date2;
var date3;
var days = 1;
var userCount = 0;
var itsme = false;
var check = "";
var myUsername = "";
var coversNum = [];
var coversResultsTeam = [];

var picksList, teamsList, resultsList, usersList;
var resultsList = [];


var badge = document.createElement('div');
badge.className = 'results';

for (var y = weekNum; y >= 1; y--) {
	weekList = weekList + `<option value ='${y}'> Week ${y} </option>`;
}

var select = `<select class='form-control form-select' id='results_by_week' onchange="getResultsByWeek(this.value);">${weekList}</select>`;

badge.innerHTML = '<form>' + select + '</form>';		
document.getElementById("weeks").appendChild(badge);

getResultsByWeek(weekNum)

function getResultsByWeek(x) {
	clearAll();
	var tableStart = "";
	var tableUser = "";
	var tableEnd = "";
	
	if (x === 0) {
		document.getElementById("week-title").innerHTML = `<h2>🏀 March Madness</h2>`;
		document.getElementById("games-section").innerHTML = `<a href="totals.html">Sabermetrics</a>`;
	}
	else if (x === 4) {
		document.getElementById("week-title").innerHTML = `<h2>🦃 Feast Week Results 🦃</h2>`;
	}
	else if (x === 8) {
		document.getElementById("week-title").innerHTML = `<h2>🎅 Week 8 Results 🎄</h2>`;
	}
	else {
		document.getElementById("week-title").innerHTML = `<h2>Week ${x} Results</h2>`;
	}
	
	var requestX = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/games/week" + x + ".json", function(json){
		xFile = json;
	});

	$.when(requestX).then(function(){
		date2 = new Date(xFile["games"][0].gameTime);
	});

	// query for all user emails and names
	var users = db.collection("Users").get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			if(allUsers.length != 21)
				allUsers.push(doc.data().Email);
			allFirst.push(doc.data().FirstName);
			allLast.push(doc.data().LastName);
		})
	});

	var getResults = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/games/week" + x + ".json", function(json){
		resultsList = json;
		/**/// get results
		for (var result in resultsList) {
			for (var r = 0; r < resultsList[result].length; r++) {
				if(resultsList[result][r].cover)
					coversResultsTeam.push(resultsList[result][r].cover);
			}
		}
	});	
	var getTeams = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/teams.json", function(json){
		teamsList = json;
	});

	// query for all user picks for the current week
	var names = db.collection("week" + x).get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			allEntries.push(doc.data().user);
			allGameOne.push(doc.data().game1);
			allGameTwo.push(doc.data().game2);
			allGameThree.push(doc.data().game3);
			allGameFour.push(doc.data().game4);
			allGameFive.push(doc.data().game5);
			allGameSix.push(doc.data().game6);
			allGameSeven.push(doc.data().game7);
			allGameEight.push(doc.data().game8);
			allGameNine.push(doc.data().game9);
			allGameTen.push(doc.data().game10);
		})
	});
	console.log(allGameOne);
	
	$.when(users, names, requestX, getResults, getTeams).then(function(){
		userCount = allUsers.length;
		var tableStart = "";
		var tableGames = "";
		tableStart = `<div class="table-responsive"><table class="table table-hover" id="results"><thead><tr><th class="first-col bg-light bg-gradient small" scope="col">NAME</th>`;

		var home, away, gameTime;
		// loop through week's game
		for (var result in resultsList) {
			for (var r = 0; r < resultsList[result].length; r++) {
				home = resultsList[result][r].homeTeam;
				away = resultsList[result][r].awayTeam;
				gameTime = resultsList[result][r].gameTime;
				// match week's teams with teams stored
				for (var weekTeam in teamsList) {
					for (var goo = 0; goo < teamsList[weekTeam].length; goo++) {
						if (home == teamsList[weekTeam][goo].teamId) {
							home = teamsList[weekTeam][goo].teamValue;
						}
						if (away == teamsList[weekTeam][goo].teamId) {
							away = teamsList[weekTeam][goo].teamValue;
						}
					}
				}
				tableGames = tableGames + `<th scope="col" class='small bg-light text-center'>${away} vs ${home}</th>`;
			}
		}
		
		tableStart = tableStart + tableGames + `<th scope="col" class='small bg-light active text-center'><strong>TOTAL</strong></th></tr></thead><tbody>`;
	
		for (var loop = 0; loop < allUsers.length; loop++) {
			if (allEntries.includes(allUsers[loop])) {
				for (var testLoop = 0; testLoop < allEntries.length; testLoop++) {
					myUsername = "bg-light";
					if (allUsers[loop] === allEntries[testLoop]) {
						if(allUsers[loop] === auth.currentUser.email) {
							itsme = true;
							isCorrect = "primary";
							myUsername = "table-primary";
						}
						else  {
							myUsername = "bg-light";
						}
						userPickTeams.push(allGameOne[testLoop]);
						userPickTeams.push(allGameTwo[testLoop]);
						userPickTeams.push(allGameThree[testLoop]);
						userPickTeams.push(allGameFour[testLoop]);
						userPickTeams.push(allGameFive[testLoop]);
						userPickTeams.push(allGameSix[testLoop]);
						userPickTeams.push(allGameSeven[testLoop]);
						userPickTeams.push(allGameEight[testLoop]);
						userPickTeams.push(allGameNine[testLoop]);
						userPickTeams.push(allGameTen[testLoop]);
						//userPickTeams.push("🔒");
						tableUser = tableUser + `<tr><th class="first-col ${myUsername} bg-gradient align-middle">${allFirst[loop] + " " +allLast[loop]}</th>`;
					}
				}
			}
			else {
				tableUser = tableUser + `<tr><th class="first-col bg-light bg-gradient align-middle">${allFirst[loop] + " " +allLast[loop]}</th>`;
				userPickTeams.push(" ");
				userPickTeams.push(" ");
				userPickTeams.push(" ");
				userPickTeams.push(" ");
				userPickTeams.push(" ");
				userPickTeams.push(" ");
				userPickTeams.push(" ");
				userPickTeams.push(" ");
				userPickTeams.push(" ");
				userPickTeams.push(" ");
			}
				// set starters
				var points = 0;
				var pointTotal = 0;
				
				for (var up = 0; up < userPickTeams.length; up++) {
					date3 = new Date(xFile["games"][up].gameTime);
					var teamImage = "";
					for (var team in teamsList) {
						for (var num = 0; num < teamsList[team].length; num++) {	
							if (userPickTeams[up] == teamsList[team][num].teamValue) {
								teamImage = teamsList[team][num].teamImage;
							}
						}
					}
					
					if(userPickTeams[up]) {
						if (date3 <= date1) {
							if (coversResultsTeam[up]) {
								if (userPickTeams[up] == coversResultsTeam[up]) {
								isCorrect = "success";
								check = "✅";
								pointTotal = pointTotal + 1;
								}
								else {
									isCorrect = "danger";			
									check = "❌";
								}
							}
							else {
								if(itsme) 
									isCorrect = "primary";
								else 
									isCorrect = "";
							}
							
							if (teamImage)
								var pick = ` <div class='align-middle text-center'><img class='mx-auto' src="https://b.fssta.com/uploads/application/college/team-logos/${teamImage}.vresize.72.72.medium.2.png"> ${check}</div>`;
						}
						else {
							if (itsme) {
								isCorrect = "primary";
								var pick = ` <div class='align-middle text-center'><img class='mx-auto' src="https://b.fssta.com/uploads/application/college/team-logos/${teamImage}.vresize.72.72.medium.2.png"> ${check}</div>`;
							}
							else {
								var pick = ` <div class='align-middle text-center'>🔒</div>`;
							}
							//tableUser = tableUser + `<td class="table-${isCorrect} align-middle text-center" id="rockyTop">🔒</td>`;
						}
						tableUser = tableUser + `<td class="table-${isCorrect} align-middle text-center">${pick}</td>`;
					}
					else {
						if (date3 <= date1) {
							isCorrect = "danger";			
							check = "❌";
						}
						else {
							isCorrect = "";			
							check = "";
						}
						
						if(itsme) {
							isCorrect = "primary";
						}
						teamImage = "";
						tableUser = tableUser + `<td class="table-${isCorrect} align-middle text-center" id="rockyTop">${check}</td>`;
					}
					isCorrect = "";
					check = "";
				}
				if (itsme)
					myUsername = "table-primary";
				else 
					myUsername = "bg-light";
				tableUser = tableUser + `<td class="${myUsername} first-col text-center align-middle fw-bold">${pointTotal}</td></tr>`;
				//tableEnd = `</tbody></table>`;
				//document.getElementById("standings").innerHTML = tableStart + tableUser + tableEnd;	
				
				// reset
				while(userPickTeams.length > 0) {
					userPickTeams.pop();
				}
				itsme = false;
				isCorrect = "";
				check = "";
		}
		var tableEnd = `</tbody></table></div>`;	
		document.getElementById("standings").innerHTML = tableStart + tableUser + tableEnd;
		sortTable(11);
		clearAll();
	});
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
	if ((rows.length-1) == allUsers.length || allUsers.length == 0) {
		document.getElementById("loader").innerHTML = ``;
	}
  }
}

function clearAll() {
	firtName = "";
	lastName = "";
	console.log(allEntries.length);
	for (var pop = 0; pop < userCount; pop++) {
		allGameOne.pop();
		allGameTwo.pop();
		allGameThree.pop();
		allGameFour.pop();
		allGameFive.pop();
		allGameSix.pop();
		allGameSeven.pop();
		allGameEight.pop();
		allGameNine.pop();
		allGameTen.pop();
		userPickTeams.pop();
		allEntries.pop();
		//allUsers.pop();
		coversResultsTeam.pop();
	}
	//allUsers = [];
	//allFirst = [];
	//allLast = [];
	storeUsers = [];
	coversNum = [];
	coversResultsTeam = [];
	coversArr = [""];
	xFile = {};
	resultsList = {};
	//names = Promise.resolve();
}
