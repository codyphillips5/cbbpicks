import { getFirestore, collection, getDocs } from "firebase/firestore";

var firtName = "";
var lastName = "";
var coversNum = [];
var coversResultsTeam = [];
var allUsers = [];
var allFirst = [];
var allLast = [];
var allEntries = [];
var allFifties = [];
var allForties = [];
var allThirties = [];
var allTwenties = [];
var allTens = [];
var userPickTeams = [];
var jsonArray = "";

var picksList, teamsList, resultsList, usersList;
var badge = document.createElement('div');
badge.className = 'standings';
var weekNum = 6;
var weekList = "";
var check = "";

for (var y = weekNum; y >= 1; y--) {
	weekList = weekList + `<option value ='${y}'> Week ${y} </option>`;
}

var select = `<select class='form-control form-select' id='results_by_week' onchange="getResultsByWeek(this.value);">${weekList}</select>`;
badge.innerHTML = '<form>' + select + '</form>';		
document.getElementById("weeks").appendChild(badge);


getResultsByWeek(weekNum);


function getResultsByWeek(week) {
	coversNum = [];
	coversResultsTeam = [];
	var getPicks = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/games/week"+ week +"_picks.json", function(json){
		picksList = json;
	});
	
	var getResults = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/games/week" + week + ".json", function(json){
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
	
	var getUsers= $.getJSON("https://codyphillips5.github.io/cbbpicks/json/users.json", function(json){
		usersList = json;
	});

	// query for all user emails and names
	const theU = db.collection("Users").get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			allUsers.push(doc.data().Email);
		})
	});
	
	
	for (var loop = 0; loop < 21; loop++) {
		console.log(allUsers[loop]);
		const users = db.collection('Users').doc('acphillips5@yahoo.com').get();
		const testUsers = db.collection('Users');
		const snapshot = getDocs(testUsers);
		const weeks = db.collection('week1').doc('acphillips5@yahoo.com').get();
	
		Promise.all([users, weeks, snapshot]).then(([usersDoc, weeksDoc, snapshotDoc]) => {
			if (usersDoc.exists && weeksDoc.exists) {
				const userData = usersDoc.data();
				const weekData = weeksDoc.data();
			
				console.log(userData.FirstName + " " +userData.LastName);
				console.log(weekData.game1);
				
				allEntries.push(userData.FirstName + " " +userData.LastName);
				
				jsonArray = `{"picks":[{"userId" : "${userData.Email}", "game1":"${weekData.game1}"}]}`;
				console.log(jsonArray);
			}})
			.catch(error => { console.error('Error fetching data:', error);
			});
	}
		var names = db.collection("week" + week).get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			allEntries.push(doc.data().user);
			allEntries.push(doc.data().game1);
			allEntries.push(doc.data().game2);
			allEntries.push(doc.data().game3);
			allEntries.push(doc.data().game4);
			allEntries.push(doc.data().game5);
			allEntries.push(doc.data().game6);
			allEntries.push(doc.data().game7);
			allEntries.push(doc.data().game8);
			allEntries.push(doc.data().game9);
			allEntries.push(doc.data().game10);
		})
	});
	
	console.log(jsonArray);

	$.when(users, names, getPicks, getResults, getTeams, getUsers).then(function(){
		console.log(allEntries);
		
		var tableStart = `<div class="table-responsive"> <table class="table table-hover" id="results"><thead><tr><th class="first-col bg-light bg-gradient small" scope="col">NAME</th>`;
		var tableGames;
		var home, away;
		// loop through week's game
		for (var result in resultsList) {
			for (var r = 0; r < resultsList[result].length; r++) {
				home = resultsList[result][r].homeTeam;
				away = resultsList[result][r].awayTeam;
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
				tableGames = tableGames + `<th scope="col" class='small text-center'>${away} vs ${home}</th>`;
			}
		}
		
		tableStart = tableStart + tableGames + `<th scope="col" class='small bg-light active text-center'><strong>TOTAL</strong></th></tr></thead><tbody>`;
	
		for (var key in picksList) {
			for (var i = 0; i < picksList[key].length; i++) {
				// set starters
				var pointTotal = 0;
				var isCorrect;
	
				var user = picksList[key][i].userId;
				var teamImage = "";
				// get user info
				for (var k in usersList) {
					for (var j = 0; j < usersList[k].length; j++) {
							if (user == usersList[k][j].userId) {
								firstName = usersList[k][j].FirstName;
								lastName = usersList[k][j].LastName;
						}
					}
				}
				var tableUser = tableUser + `<tr><th class="first-col bg-light bg-gradient">${firstName + " " + lastName}</th>`;
				// check user picks against results
				for (var gameNum = 1; gameNum <= 10; gameNum++) {
					var pick = picksList[key][i]["game"+gameNum];
					for (var team in teamsList) {
						for (var num = 0; num < teamsList[team].length; num++) {	
							if (pick == teamsList[team][num].teamValue) {
								teamImage = teamsList[team][num].teamImage;
							}
						}
					}
					
					if(coversResultsTeam[gameNum-1] == pick) {
						isCorrect = "success";
						check = "✅";
						pointTotal = pointTotal+1;
					}
					else if(gameNum > coversResultsTeam.length) {
						isCorrect = "";
						check = "";
					}
					else {
						isCorrect = "danger";				
						check = "❌";			
					}
					if (teamImage)
						pick = ` <div class='text-center'><img class='mx-auto' src="https://b.fssta.com/uploads/application/college/team-logos/${teamImage}.vresize.200.200.medium.2.png"> ${check}</div>`;
					tableUser = tableUser + `<td class="table-${isCorrect}">${pick}</td>`;
					teamImage = "";
				}
				//calculate score			
				tableUser = tableUser + `<td class="bg-light active fw-bolder text-center">${pointTotal}</td></tr>`;
			}
		}
		tableUser = tableUser.replace("undefined","");
		tableStart = tableStart.replace("undefined","");
		var tableEnd = `</tbody></table>`;	
		document.getElementById("standings").innerHTML = tableStart + tableUser + tableEnd;
		sortTable(11);
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
  }
}