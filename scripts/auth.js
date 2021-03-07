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

var weekNum = 15;
var empty = false;
var firstName;
var users = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/users.json", function(json){
	usersFile = json;
});

// create new guide
const createForm = document.querySelector('#save_picks');
if(createForm) {
	firebase.auth().onAuthStateChanged(user => {
	var week = db.collection('week' + weekNum).doc(auth.currentUser.email);

	week.get()
		.then((docSnapshot) => {
			if (docSnapshot.data()) {
				if (docSnapshot.data().game11 !== undefined) { 
					document.getElementById("label-choice-seasongame1").innerHTML = `<label class="choice">${docSnapshot.data().game1} <span class="glyphicon glyphicon-plusglyphicon glyphicon-check"></span></label>`
				}
			}
		});
	});	
	
	createForm.addEventListener('submit', (e) => {
	e.preventDefault();
	if (auth.currentUser === null) {
		createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">Pick NOT Saved. Please <a href='log.html'>Log In</a>.</div>`;
	}
	console.log(auth.currentUser.email);
	var week = db.collection('week' + weekNum).doc(auth.currentUser.email);
		week.get()
		  .then((docSnapshot) => {
			if (docSnapshot.exists) {
				week.update({
					user: auth.currentUser.email,
					game1: document.getElementById('seasongame1').value
				}).then(function() {
					success();
				}).catch(err => {
					console.log("error: " + err.message);
					createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
				});
			} else {
				week.set({
					user: auth.currentUser.email,
					game1: document.getElementById('seasongame1').value
				}).then(() => {
					success();
				}).catch(err => {
					console.log(err.message)
					createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
				});				
			}
		});
    });
}

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
	$.when(users).then(function(){	
	for (var key in usersFile) {
		for (var i = 0; i < usersFile[key].length; i++) {
			if(auth.currentUser.email == usersFile[key][i].Email) {
				firstName = usersFile[key][i].FirstName;
			}
		}
	}
	});
	createForm.reset();
	createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-success" role="alert">Success! Your picks have been saved. <br>Good luck, ${firstName}!</div>`;
	document.getElementById("savePicks").disabled = true;
	document.getElementById("savePicks").innerHTML = "Saved";
}