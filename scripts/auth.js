// listen for auth status changes
auth.onAuthStateChanged(user => {
    if(user) {
        // get data
        //console.log(user);
        db.collection('guides').onSnapshot(_snapshot => {
        //setupGuides(snapshot.docs);
        window.setupUI(user);
        }, err => {
            console.log(err.message)
        })
    }
    else {
        window.setupUI();
		//document.getElementById("saver").innerHTML = `<button type="submit" id="savePicks" disabled class='btn btn-primary'>Login</button>`;
		var saveBtn = document.getElementById('savePicks');
		if (saveBtn) {
			saveBtn.disabled = true;
			saveBtn.innerHTML = 'Login to Submit';
		}
        //setupGuides([]);
    }
})
var icon = "";
var coversTeam = [];
var weekNum = 2;
var fn = "";
if (typeof CBBApi !== 'undefined') {
	CBBApi.fetchUsers()
		.then(function (json) {
			usersFile = json;
		})
		.catch(function (err) {
			if (typeof CBBLogger !== 'undefined') {
				CBBLogger.error('Failed to load users.json', err);
			}
		});
}

var getResultsPromise =
	typeof CBBApi !== 'undefined'
		? CBBApi.fetchWeekGames(weekNum).then(function (json) {
				resultsList = json;
				for (var result in resultsList) {
					for (var r = 0; r < resultsList[result].length; r++) {
						if (resultsList[result][r].cover) {
							coversTeam.push(resultsList[result][r].cover);
						}
					}
				}
			})
		: Promise.reject(new Error('CBBApi not loaded'));

const createForm = document.querySelector('#save_picks');
//, activeScript
getResultsPromise
	.then(function () {
// create new guide
if(createForm) {
	firebase.auth().onAuthStateChanged(_user => {
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
			return;
		}

		var docRef = db.collection('Users').doc(auth.currentUser.email);
		docRef.get().then((doc) => {
			if (doc.exists) {
				fn = doc.data().FirstName;
			}
		}).catch((error) => {
			console.log('Error getting document:', error);
		});

		var games = resultsList && resultsList.games ? resultsList.games : [];
		var built = buildWeekPicksPatch(
			auth.currentUser.email,
			readOpenGameSelections(document, games, Date.now())
		);
		if (!built) {
			createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-warning" role="alert">Choose a team for at least one game that is still open.</div>`;
			return;
		}

		var payload = { user: built.user };
		for (var n = 1; n <= 10; n++) {
			var key = 'game' + n;
			if (built.fields[key]) payload[key] = built.fields[key];
		}
		payload.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
		payload.history = firebase.firestore.FieldValue.arrayUnion({
			at: new Date().toISOString(),
			games: built.fields,
		});

		var saveBtn = document.getElementById('savePicks');
		if (saveBtn) saveBtn.disabled = true;

		db.collection('week' + weekNum)
			.doc(auth.currentUser.email)
			.set(payload, { merge: true })
			.then(function () {
				success();
			})
			.catch(function (err) {
				console.log('error: ' + err.message);
				if (saveBtn) {
					saveBtn.disabled = false;
					saveBtn.innerHTML = 'Save My Picks';
				}
				createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
			});
	});
}
})
	.catch(function (err) {
		if (typeof CBBLogger !== 'undefined') {
			CBBLogger.error('Failed to load week games for picks UI', err);
		}
		var el = document.querySelector('.alert');
		if (el) {
			el.classList.add('alert-danger');
			el.textContent = 'Could not load game data. Please refresh.';
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
				auth.createUserWithEmailAndPassword(email, password).then(() => {
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
if (logout) {
	logout.addEventListener('click', (e) => {
		e.preventDefault();
		auth.signOut();
	});
}

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
			
				auth.signInWithEmailAndPassword(email, password).then(() => {
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

/* picks-submit */
function isGameOpenForPicks(game, nowMs) {
	if (!game || typeof game !== 'object') return false;
	if (game.active !== true) return false;
	if (game.cover) return false;
	if (game.gameTime) {
		var start = new Date(game.gameTime).getTime();
		if (!isNaN(start) && nowMs >= start) return false;
	}
	return true;
}

function buildWeekPicksPatch(email, selections) {
	if (!email || !selections || typeof selections !== 'object') return null;
	var fields = {};
	var count = 0;
	for (var i = 1; i <= 10; i++) {
		var raw = selections[i];
		if ((raw === undefined || raw === null) && selections['game' + i] != null) {
			raw = selections['game' + i];
		}
		var value = raw == null ? '' : String(raw).trim();
		if (!value) continue;
		fields['game' + i] = value;
		count++;
	}
	if (!count) return null;
	return { user: String(email), fields: fields };
}

function readOpenGameSelections(doc, games, nowMs) {
	var root = doc || document;
	var list = games || [];
	var now = nowMs == null ? Date.now() : nowMs;
	var selections = {};
	for (var i = 1; i <= 10; i++) {
		var select = root.getElementById('game' + i);
		if (!select || String(select.tagName).toUpperCase() !== 'SELECT') continue;
		var game = null;
		for (var g = 0; g < list.length; g++) {
			if (list[g] && list[g].gameId === i) game = list[g];
		}
		if (!isGameOpenForPicks(game, now)) continue;
		selections[i] = select.value;
	}
	return selections;
}
/* end-picks-submit */

function success() {
	if (!createForm) return;
	createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-success" role="alert">Success! Your picks have been saved. <br>Good luck, ${fn}!</div>`;
	var sp = document.getElementById('savePicks');
	if (sp) {
		sp.disabled = false;
		sp.innerHTML = 'Save My Picks';
	}
}

// forgot-password
const forgotForm = document.querySelector('#forgot-form');
if(forgotForm) {
    forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // get user info
        const email = forgotForm['forgot-email'].value;
		auth.sendPasswordResetEmail(email).then(() => {
			forgotForm.reset();
            forgotForm.querySelector('.response').innerHTML = `<br><div class="alert alert-success" role="alert">Reset Email Sent. Return to <a href='log.html'>Log In</a></div>`;
		})
		.catch(err => {
			forgotForm.querySelector('.error').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
		});
    });
}