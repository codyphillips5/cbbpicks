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
		document.getElementById("savePicks").disabled = true;
		document.getElementById("savePicks").innerHTML = "Login to Submit";
        //setupGuides([]);
    }
})

// create new guide
const createForm = document.querySelector('#save_picks');
if(createForm) {
    createForm.addEventListener('submit', (e) => {
        e.preventDefault();
    
        db.collection('week12_day5').add({
            user: auth.currentUser.email,
            game116: document.getElementById('seasongame116').value,
            game117: document.getElementById('seasongame117').value,
            game118: document.getElementById('seasongame118').value
        }).then(() => {
            // close the modal and reset form
            //const modal = document.querySelector('#modal-create');
            //M.Modal.getInstance(modal).close();
            createForm.reset();
            createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-success" role="alert">Success! Your picks have been saved. At this time, picks may only be submitted ONCE. Please reach out to Cody with questions or any pick changes.</div>`;
			document.getElementById("savePicks").disabled = true;
			document.getElementById("savePicks").innerHTML = "Saved";
        }).catch(err => {
            console.log(err.message)
            //signupForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
        });
    });
}

// signup
const signupForm = document.querySelector('#signup-form');
if(signupForm) {
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

// logout 
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
if(loginForm) {
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
