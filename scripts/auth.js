// listen for auth status changes
auth.onAuthStateChanged(user => {
    if(user) {
        // get data
        //console.log(user);
        db.collection('guides').onSnapshot(snapshot => {
        //setupGuides(snapshot.docs);
        setupUI(user);
        }, err => {
            console.log(err.message)
        })
    }
    else {
        setupUI();
		//document.getElementById("saver").innerHTML = `<button type="submit" id="savePicks" disabled class='btn btn-primary'>Login</button>`;
		document.getElementById("savePicks").disabled = true;
		document.getElementById("savePicks").innerHTML = "Login to Submit";
        //setupGuides([]);
    }
})
var startArray = 0;
var sa = 0;
var lengthArray = 0;
var la = 0;
var saLa = [];
var icon = "";
var coversTeam = [];
var weekNum = 15;
var empty = false;
var fn = "";
var users = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/users.json", function(json){
	usersFile = json;
});


var getResults = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/games/week" + weekNum + ".json", function(json){
		resultsList = json;
		// get results
		for (var result in resultsList) {
			for (var r = 0; r < resultsList[result].length; r++) {
				if(resultsList[result][r].cover)
					coversTeam.push(resultsList[result][r].cover);
				if(resultsList[result][r].active) {
					if(resultsList[result][r].active === true) {
						sa = resultsList[result][r].gameId;
						saLa.push(sa);
					}
				}
			}
		}
	startArray = saLa[0];
	lengthArray = saLa.length;
});

   const createForm = document.querySelector('#save_picks');
//, activeScript
$.when(getResults).then(function(){
// create new guide
if(createForm) {
	firebase.auth().onAuthStateChanged(user => {
	var week = db.collection('week' + weekNum).doc(auth.currentUser.email);

	week.get()
		.then((docSnapshot) => {
			if (docSnapshot.data()) {
				if (docSnapshot.data().game1 !== undefined) { 
					icon = "";
					if (coversTeam.length >= 1) {
						if (docSnapshot.data().game1 == coversTeam[0]) { 
							var element = document.getElementById('game-1');
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-success");  
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "✅";
						}
						else {
							var element = document.getElementById('game-1');
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-danger");  
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "❌";
						}
					}
					var gameElement = document.getElementById('game-1');
					if (gameElement !== null) {
						document.getElementById('seasongame1').value = docSnapshot.data().game1;		
						document.getElementById("label-choice-seasongame1").innerHTML = `<label class="choice">${docSnapshot.data().game1} <span class="game1-icon">${icon}</span></label>`
					}
				}
				if (docSnapshot.data().game2 !== undefined) { 
					icon = "";
					if (coversTeam.length >= 2) {
						if (docSnapshot.data().game2 == coversTeam[1]) { 
							var element = document.getElementById('game-2');
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-success");  
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "✅";
						}
						else {
							var element = document.getElementById('game-2');
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-danger");
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "❌";
						}
					}
					var gameElement = document.getElementById('game-2');
					if (gameElement !== null) {
						console.log(document.getElementById('seasongame2').value);		
						document.getElementById('seasongame2').value = docSnapshot.data().game2;
						console.log(document.getElementById('seasongame2').value);		
						document.getElementById("label-choice-seasongame2").innerHTML = `<label class="choice">${docSnapshot.data().game2} <span class="game2-icon"></span>${icon}</label>`
					}
				}
				if (docSnapshot.data().game3 !== undefined) { 
					icon = "";
					if (coversTeam.length >= 3) {
						if (docSnapshot.data().game3 == coversTeam[2]) { 
							var element = document.getElementById('game-3');
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-success");  
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "✅";
						}
						else {
							var element = document.getElementById('game-3');
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-danger");
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "❌";
						}
					}
					var gameElement = document.getElementById('game-3');
					if (gameElement !== null) {
						document.getElementById('seasongame3').value = 	docSnapshot.data().game3;		
						document.getElementById("label-choice-seasongame3").innerHTML = `<label class="choice">${docSnapshot.data().game3} <span class="game3-icon">${icon}</span></label>`
					}
				}
				if (docSnapshot.data().game4 !== undefined) { 
					icon = "";
					if (coversTeam.length >= 4) {
						if (docSnapshot.data().game4 == coversTeam[3]) { 
							var element = document.getElementById('game-4');
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-success");  
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "✅";
						}
						else {
							var element = document.getElementById('game-4');
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-danger");
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "❌";
						}
					}
					var gameElement = document.getElementById('game-4');
					if (gameElement !== null) {
						document.getElementById('seasongame4').value = 	docSnapshot.data().game4;		
						document.getElementById("label-choice-seasongame4").innerHTML = `<label class="choice">${docSnapshot.data().game4} <span class="game4-icon">${icon}</span></label>`
					}
				}
				if (docSnapshot.data().game5 !== undefined) { 
					icon = "";
					if (coversTeam.length >= 5) {
						if (docSnapshot.data().game5 == coversTeam[4]) { 
							var element = document.getElementById('game-5');							
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-success");  
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "✅";
						}
						else {							
							var element = document.getElementById('game-5');
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-danger");
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "❌";
						}
					}
					var gameElement = document.getElementById('game-5');
					if (gameElement !== null) {
						document.getElementById('seasongame5').value = 	docSnapshot.data().game5;		
						document.getElementById("label-choice-seasongame5").innerHTML = `<label class="choice">${docSnapshot.data().game5} <span class="game5-icon">${icon}</span></label>`
					}
				}
				if (docSnapshot.data().game6 !== undefined) { 
					icon = "";
					if (coversTeam.length >= 6) {
						if (docSnapshot.data().game6 == coversTeam[5]) { 
							var element = document.getElementById('game-6');
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-success");  
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "✅";
						}
						else {
							var element = document.getElementById('game-6');
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-danger");
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "❌";
						}
					}
					var gameElement = document.getElementById('game-6');
					if (gameElement !== null) {
						document.getElementById('seasongame6').value = 	docSnapshot.data().game6;		
						document.getElementById("label-choice-seasongame6").innerHTML = `<label class="choice">${docSnapshot.data().game6} <span class="game6-icon">${icon}</span></label>`
					}
				}
				if (docSnapshot.data().game7 !== undefined) { 
					icon = "";
					if (coversTeam.length >= 7) {
						if (docSnapshot.data().game7 == coversTeam[6]) { 
							var element = document.getElementById('game-7');
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-success");  
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "✅";
						}
						else {
							var element = document.getElementById('game-7');
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-danger");
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "❌";
						}
					}
					var gameElement = document.getElementById('game-7');
					if (gameElement !== null) {
						document.getElementById('seasongame7').value = 	docSnapshot.data().game7;		
						document.getElementById("label-choice-seasongame7").innerHTML = `<label class="choice">${docSnapshot.data().game7} <span class="game7-icon">${icon}</span></label>`
					}
				}
				if (docSnapshot.data().game8 !== undefined) {
					icon = ""; 
					if (coversTeam.length >= 8) {
						if (docSnapshot.data().game8 == coversTeam[7]) { 
							var element = document.getElementById('game-8');
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-success");  
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "✅";
						}
						else {
							var element = document.getElementById('game-8');
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-danger");
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "❌";
						}
					}
					var gameElement = document.getElementById('game-8');
					if (gameElement !== null) {
						document.getElementById('seasongame8').value = 	docSnapshot.data().game8;		
						document.getElementById("label-choice-seasongame8").innerHTML = `<label class="choice">${docSnapshot.data().game8} <span class="game8-icon">${icon}</span></label>`
					}
				}
				if (docSnapshot.data().game9 !== undefined) {
					icon = "";
					if (coversTeam.length >= 9) {
						if (docSnapshot.data().game9 == coversTeam[8]) { 
							var element = document.getElementById('game-9');
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-success");  
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "✅";
						}
						else {
							var element = document.getElementById('game-9');
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-danger");
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "❌";
						}
					} 
					var gameElement = document.getElementById('game-9');
					if (gameElement !== null) {
						document.getElementById('seasongame9').value = 	docSnapshot.data().game9;		
						document.getElementById("label-choice-seasongame9").innerHTML = `<label class="choice">${docSnapshot.data().game9} <span class="game9-icon">${icon}</span></label>`
					}
				}
				if (docSnapshot.data().game10 !== undefined) { 
					icon = "";
					if (coversTeam.length >= 10) {
						if (docSnapshot.data().game10 == coversTeam[9]) { 
							var element = document.getElementById('game-10');
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-success");  
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "✅";
						}
						else {
							var element = document.getElementById('game-10');
							if (element !== null) {
								element.classList.remove("bg-light");
								element.classList.add("bg-danger");
								element.classList.add("p-2");
								element.classList.add("text-dark");
								element.classList.add("bg-opacity-25");
							}
							icon = "❌";
						}
					}
					var gameElement = document.getElementById('game-10');
					if (gameElement !== null) {
						document.getElementById('seasongame10').value = docSnapshot.data().game10;		
						document.getElementById("label-choice-seasongame10").innerHTML = `<label class="choice">${docSnapshot.data().game10} <span class="game10-icon">${icon}</span></label>`
					}
				}
			}
		});
	});	
	
	createForm.addEventListener('submit', (e) => {
	e.preventDefault();
	if (auth.currentUser === null) {
		createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">Pick NOT Saved. Please <a href='log.html'>Log In</a>.</div>`;
	}
	
	// get user's first name
			var docRef = db.collection("Users").doc(auth.currentUser.email);
			docRef.get().then((doc) => {
				if (doc.exists) {
					fn = doc.data().FirstName;
					console.log(fn);
				} else {
					// doc.data() will be undefined in this case
					console.log("No such document!");
				}
			}).catch((error) => {
				console.log("Error getting document:", error);
			})
	
	console.log(auth.currentUser.email);
	console.log(startArray);
	console.log(lengthArray);
	var week = db.collection('week' + weekNum).doc(auth.currentUser.email);
		week.get()
		  .then((docSnapshot) => {
			if (docSnapshot.exists) {
				// the 1 set update
				//1, 1
				week.update({
						user: auth.currentUser.email,
						game1: document.getElementById('seasongame1').value,
						game2: document.getElementById('seasongame2').value,
						game3: document.getElementById('seasongame3').value,
						game4: document.getElementById('seasongame4').value,
						game5: document.getElementById('seasongame5').value,
						game6: document.getElementById('seasongame6').value,
						game7: document.getElementById('seasongame7').value,
						game8: document.getElementById('seasongame8').value,
						game9: document.getElementById('seasongame9').value,
						game10: document.getElementById('seasongame10').value
				}).then(function() {
					success();
				}).catch(err => {
					console.log("error: " + err.message);
					createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
				});
			}
			else {
				week.set({	
						user: auth.currentUser.email,
						game1: document.getElementById('seasongame1').value,
						game2: document.getElementById('seasongame2').value,
						game3: document.getElementById('seasongame3').value,
						game4: document.getElementById('seasongame4').value,
						game5: document.getElementById('seasongame5').value,
						game6: document.getElementById('seasongame6').value,
						game7: document.getElementById('seasongame7').value,
						game8: document.getElementById('seasongame8').value,
						game9: document.getElementById('seasongame9').value,
						game10: document.getElementById('seasongame10').value
				}).then(function() {
					success();
				}).catch(err => {
					console.log("error: " + err.message);
					createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
				});
			}
		});
    });
}
});

// signup
const signupForm = document.querySelector('#signup-form');
firebase.auth().onAuthStateChanged(user => {
	if(signupForm) {
		if (!user) {
			signupForm.addEventListener('submit', (e) => {
				e.preventDefault();
				
				// get user info
				const email = signupForm['signup-email'].value;
				const password = signupForm['signup-password'].value;

				// sign up the user
				auth.createUserWithEmailAndPassword(email, password).then(cred => {
				signupForm.reset();
				signupForm.querySelector('.response').innerHTML = `<br><div class="alert alert-success" role="alert">Success! Account created. Go view the <a href='picks.html'>Lines</a></div>`;
				document.getElementById("signup").disabled = true;
				}).catch(err => {
					signupForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
				});
			});
		}
		else {
		console.log('already a user');
		location.replace("picks.html");
		}
	}
});	


// logout 
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
firebase.auth().onAuthStateChanged(user => {
	if(loginForm) {
		if (!user) {
			loginForm.addEventListener('submit', (e) => {
				e.preventDefault();
			
				// get user info
				const email = loginForm['login-email'].value;
				const password = loginForm['login-password'].value;
			
				auth.signInWithEmailAndPassword(email, password).then(cred => {
					// close the login modal and reset the form
					loginForm.reset();
					location.replace("picks.html");
				}).catch(err => {
					loginForm.querySelector('.error').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
				})
			});		
		}
		else {
			console.log('already a user');
			location.replace("picks.html");
		}
	}
});

function success() {
	createForm.reset();
	createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-success" role="alert">Success! Your picks have been saved. <br>Good luck, ${fn}!</div>`;
	document.getElementById("savePicks").disabled = true;
	document.getElementById("savePicks").innerHTML = "Saved";
}

// forgot-password
const forgotForm = document.querySelector('#forgot-form');
if(forgotForm) {
	console.log("here");
    forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // get user info
        const email = forgotForm['forgot-email'].value;
    console.log(email);
		auth.sendPasswordResetEmail(email).then(cred => {
			forgotForm.reset();
            forgotForm.querySelector('.response').innerHTML = `<br><div class="alert alert-success" role="alert">Reset Email Sent. Return to <a href='log.html'>Log In</a></div>`;
		})
		.catch(err => {
			forgotForm.querySelector('.error').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
		});
    });
}