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
var lengthArray = 0;
var weekNum = 1;
var empty = false;
var firstName;
var users = $.getJSON("https://codyphillips5.github.io/cbbpicks/json/users.json", function(json){
	usersFile = json;
});

var activeScript = $.getScript("https://codyphillips5.github.io/cbbpicks/scripts/js_active.js", function() {
   console.log(arrayActive);
   startArray = arrayActive[0];
   lengthArray = arrayActive.length;
   console.log(startArray);
   console.log(lengthArray);
});
$.when(activeScript).then(function(){
// create new guide
const createForm = document.querySelector('#save_picks');
if(createForm) {
	firebase.auth().onAuthStateChanged(user => {
	var week = db.collection('week' + weekNum).doc(auth.currentUser.email);

	week.get()
		.then((docSnapshot) => {
			if (docSnapshot.data()) {
				if (docSnapshot.data().game1 !== undefined) { 
					document.getElementById("label-choice-seasongame1").innerHTML = `<label class="choice">${docSnapshot.data().game1} <span class="glyphicon glyphicon-plusglyphicon glyphicon-check"></span></label>`
				}
				if (docSnapshot.data().game2 !== undefined) { 
					document.getElementById("label-choice-seasongame2").innerHTML = `<label class="choice">${docSnapshot.data().game2} <span class="glyphicon glyphicon-plusglyphicon glyphicon-check"></span></label>`
				}
				if (docSnapshot.data().game3 !== undefined) { 
					document.getElementById("label-choice-seasongame3").innerHTML = `<label class="choice">${docSnapshot.data().game3} <span class="glyphicon glyphicon-plusglyphicon glyphicon-check"></span></label>`
				}
				if (docSnapshot.data().game4 !== undefined) { 
					document.getElementById("label-choice-seasongame4").innerHTML = `<label class="choice">${docSnapshot.data().game4} <span class="glyphicon glyphicon-plusglyphicon glyphicon-check"></span></label>`
				}
				if (docSnapshot.data().game5 !== undefined) { 
					document.getElementById("label-choice-seasongame5").innerHTML = `<label class="choice">${docSnapshot.data().game5} <span class="glyphicon glyphicon-plusglyphicon glyphicon-check"></span></label>`
				}
				if (docSnapshot.data().game6 !== undefined) { 
					document.getElementById("label-choice-seasongame6").innerHTML = `<label class="choice">${docSnapshot.data().game6} <span class="glyphicon glyphicon-plusglyphicon glyphicon-check"></span></label>`
				}
				if (docSnapshot.data().game7 !== undefined) { 
					document.getElementById("label-choice-seasongame7").innerHTML = `<label class="choice">${docSnapshot.data().game7} <span class="glyphicon glyphicon-plusglyphicon glyphicon-check"></span></label>`
				}
				if (docSnapshot.data().game8 !== undefined) { 
					document.getElementById("label-choice-seasongame8").innerHTML = `<label class="choice">${docSnapshot.data().game8} <span class="glyphicon glyphicon-plusglyphicon glyphicon-check"></span></label>`
				}
				if (docSnapshot.data().game9 !== undefined) { 
					document.getElementById("label-choice-seasongame9").innerHTML = `<label class="choice">${docSnapshot.data().game9} <span class="glyphicon glyphicon-plusglyphicon glyphicon-check"></span></label>`
				}
				if (docSnapshot.data().game10 !== undefined) { 
					document.getElementById("label-choice-seasongame10").innerHTML = `<label class="choice">${docSnapshot.data().game10} <span class="glyphicon glyphicon-plusglyphicon glyphicon-check"></span></label>`
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
	console.log(startArray);
	console.log(lengthArray);
	var week = db.collection('week' + weekNum).doc(auth.currentUser.email);
		week.get()
		  .then((docSnapshot) => {
			if (docSnapshot.exists) {
				// the 1 set update
				//1, 1
				if (startArray == 1 && lengthArray == 1) {
					week.update({	
							user: auth.currentUser.email,
							game1: document.getElementById('seasongame1').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 1, 2
				if (startArray == 1 && lengthArray == 2) {
					week.update({	
							user: auth.currentUser.email,
							game1: document.getElementById('seasongame1').value,
							game2: document.getElementById('seasongame2').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 1, 3
				if (startArray == 1 && lengthArray == 3) {
					week.update({	
							user: auth.currentUser.email,
							game1: document.getElementById('seasongame1').value,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 1, 4
				if (startArray == 1 && lengthArray == 4) {
					week.update({	
							user: auth.currentUser.email,
							game1: document.getElementById('seasongame1').value,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 1, 5
				if (startArray == 1 && lengthArray == 5) {
					week.update({	
							user: auth.currentUser.email,
							game1: document.getElementById('seasongame1').value,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 1, 6
				if (startArray == 1 && lengthArray == 6) {
					week.update({	
							user: auth.currentUser.email,
							game1: document.getElementById('seasongame1').value,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 1, 7
				if (startArray == 1 && lengthArray == 7) {
					week.update({	
							user: auth.currentUser.email,
							game1: document.getElementById('seasongame1').value,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 1, 8
				if (startArray == 1 && lengthArray == 8) {
					week.update({	
							user: auth.currentUser.email,
							game1: document.getElementById('seasongame1').value,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 1, 9
				if (startArray == 1 && lengthArray == 9) {
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
							game9: document.getElementById('seasongame9').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 1, 10
				if (startArray == 1 && lengthArray == 10) {
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
				// the 2 set update
				// 2, 1
				if (startArray == 2 && lengthArray == 1) {
					week.update({	
							user: auth.currentUser.email,
							game2: document.getElementById('seasongame2').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 2, 2
				if (startArray == 2 && lengthArray == 2) {
					week.update({	
							user: auth.currentUser.email,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 2, 3
				if (startArray == 2 && lengthArray == 3) {
					week.update({	
							user: auth.currentUser.email,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 2, 4
				if (startArray == 2 && lengthArray == 4) {
					week.update({	
							user: auth.currentUser.email,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 2, 5
				if (startArray == 2 && lengthArray == 5) {
					week.update({	
							user: auth.currentUser.email,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 2, 6
				if (startArray == 2 && lengthArray == 6) {
					week.update({	
							user: auth.currentUser.email,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 2, 7
				if (startArray == 2 && lengthArray == 7) {
					week.update({	
							user: auth.currentUser.email,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 2, 8
				if (startArray == 2 && lengthArray == 8) {
					week.update({	
							user: auth.currentUser.email,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value,
							game9: document.getElementById('seasongame9').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 2, 9
				if (startArray == 2 && lengthArray == 9) {
					week.update({	
							user: auth.currentUser.email,
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
				
				// the 3 set update
				// 3, 1
				if (startArray == 3 && lengthArray == 1) {
					week.update({	
							user: auth.currentUser.email,
							game3: document.getElementById('seasongame3').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 3, 2
				if (startArray == 3 && lengthArray == 2) {
					week.update({	
							user: auth.currentUser.email,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 3, 3
				if (startArray == 3 && lengthArray == 3) {
					week.update({	
							user: auth.currentUser.email,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 3, 4
				if (startArray == 3 && lengthArray == 4) {
					week.update({	
							user: auth.currentUser.email,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 3, 5
				if (startArray == 3 && lengthArray == 5) {
					week.update({	
							user: auth.currentUser.email,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 3, 6
				if (startArray == 3 && lengthArray == 6) {
					week.update({	
							user: auth.currentUser.email,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 3, 7
				if (startArray == 3 && lengthArray == 7) {
					week.update({	
							user: auth.currentUser.email,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value,
							game9: document.getElementById('seasongame9').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 3, 8
				if (startArray == 3 && lengthArray == 8) {
					week.update({	
							user: auth.currentUser.email,
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
				
				// the 4 set update
				// 4, 1
				if (startArray == 4 && lengthArray == 1) {
					week.update({	
							user: auth.currentUser.email,
							game4: document.getElementById('seasongame4').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 4, 2
				if (startArray == 4 && lengthArray == 2) {
					week.update({	
							user: auth.currentUser.email,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 4, 3
				if (startArray == 4 && lengthArray == 3) {
					week.update({	
							user: auth.currentUser.email,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 4, 4
				if (startArray == 4 && lengthArray == 4) {
					week.update({	
							user: auth.currentUser.email,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 4, 5
				if (startArray == 4 && lengthArray == 5) {
					week.update({	
							user: auth.currentUser.email,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 4, 6
				if (startArray == 4 && lengthArray == 6) {
					week.update({	
							user: auth.currentUser.email,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value,
							game9: document.getElementById('seasongame9').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 4, 7
				if (startArray == 4 && lengthArray == 7) {
					week.update({	
							user: auth.currentUser.email,
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
				// the 5 set update
				// 5, 1
				if (startArray == 5 && lengthArray == 1) {
					week.update({	
							user: auth.currentUser.email,
							game5: document.getElementById('seasongame5').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 5, 2
				if (startArray == 5 && lengthArray == 2) {
					week.update({	
							user: auth.currentUser.email,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 5, 3
				if (startArray == 5 && lengthArray == 3) {
					week.update({	
							user: auth.currentUser.email,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 5, 4
				if (startArray == 5 && lengthArray == 4) {
					week.update({	
							user: auth.currentUser.email,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 5, 5
				if (startArray == 5 && lengthArray == 5) {
					week.update({	
							user: auth.currentUser.email,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value,
							game9: document.getElementById('seasongame9').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 5, 6
				if (startArray == 5 && lengthArray == 6) {
					week.update({	
							user: auth.currentUser.email,
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
				// the 6 set update
				// 6, 1
				if (startArray == 6 && lengthArray == 1) {
					week.update({	
							user: auth.currentUser.email,
							game6: document.getElementById('seasongame6').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 6, 2
				if (startArray == 6 && lengthArray == 2) {
					week.update({	
							user: auth.currentUser.email,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 6, 3
				if (startArray == 6 && lengthArray == 3) {
					week.update({	
							user: auth.currentUser.email,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 6, 4
				if (startArray == 6 && lengthArray == 4) {
					week.update({	
							user: auth.currentUser.email,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value,
							game9: document.getElementById('seasongame9').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 6, 5
				if (startArray == 6 && lengthArray == 5) {
					week.update({	
							user: auth.currentUser.email,
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
				// the 7 set update
				// 7, 1
				if (startArray == 7 && lengthArray == 1) {
					week.update({	
							user: auth.currentUser.email,
							game7: document.getElementById('seasongame7').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 7, 2
				if (startArray == 7 && lengthArray == 2) {
					week.update({	
							user: auth.currentUser.email,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 7, 3
				if (startArray == 7 && lengthArray == 3) {
					week.update({	
							user: auth.currentUser.email,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value,
							game9: document.getElementById('seasongame9').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 7, 4
				if (startArray == 7 && lengthArray == 4) {
					week.update({	
							user: auth.currentUser.email,
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
				// the 8 set update
				// 8, 1
				if (startArray == 8 && lengthArray == 1) {
					week.update({	
							user: auth.currentUser.email,
							game8: document.getElementById('seasongame8').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 8, 2
				if (startArray == 8 && lengthArray == 2) {
					week.update({	
							user: auth.currentUser.email,
							game8: document.getElementById('seasongame8').value,
							game9: document.getElementById('seasongame9').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 8, 3
				if (startArray == 8 && lengthArray == 3) {
					week.update({	
							user: auth.currentUser.email,
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
				// the 9 set update
				// 9, 1
				if (startArray == 9 && lengthArray == 1) {
					week.update({	
							user: auth.currentUser.email,
							game9: document.getElementById('seasongame9').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 9, 2
				if (startArray == 9 && lengthArray == 2) {
					week.update({	
							user: auth.currentUser.email,
							game9: document.getElementById('seasongame9').value,
							game10: document.getElementById('seasongame10').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// the 10 set update
				// 10, 1
				if (startArray == 10 && lengthArray == 1) {
					week.update({	
							user: auth.currentUser.email,
							game10: document.getElementById('seasongame10').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}			
			} else {
				// the 1 set set
				//1, 1
				if (startArray == 1 && lengthArray == 1) {
					week.set({	
							user: auth.currentUser.email,
							game1: document.getElementById('seasongame1').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 1, 2
				if (startArray == 1 && lengthArray == 2) {
					week.set({	
							user: auth.currentUser.email,
							game1: document.getElementById('seasongame1').value,
							game2: document.getElementById('seasongame2').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 1, 3
				if (startArray == 1 && lengthArray == 3) {
					week.set({	
							user: auth.currentUser.email,
							game1: document.getElementById('seasongame1').value,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 1, 4
				if (startArray == 1 && lengthArray == 4) {
					week.set({	
							user: auth.currentUser.email,
							game1: document.getElementById('seasongame1').value,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 1, 5
				if (startArray == 1 && lengthArray == 5) {
					week.set({	
							user: auth.currentUser.email,
							game1: document.getElementById('seasongame1').value,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 1, 6
				if (startArray == 1 && lengthArray == 6) {
					week.set({	
							user: auth.currentUser.email,
							game1: document.getElementById('seasongame1').value,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 1, 7
				if (startArray == 1 && lengthArray == 7) {
					week.set({	
							user: auth.currentUser.email,
							game1: document.getElementById('seasongame1').value,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 1, 8
				if (startArray == 1 && lengthArray == 8) {
					week.set({	
							user: auth.currentUser.email,
							game1: document.getElementById('seasongame1').value,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 1, 9
				if (startArray == 1 && lengthArray == 9) {
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
							game9: document.getElementById('seasongame9').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 1, 10
				if (startArray == 1 && lengthArray == 10) {
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
				// the 2 set set
				// 2, 1
				if (startArray == 2 && lengthArray == 1) {
					week.set({	
							user: auth.currentUser.email,
							game2: document.getElementById('seasongame2').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 2, 2
				if (startArray == 2 && lengthArray == 2) {
					week.set({	
							user: auth.currentUser.email,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 2, 3
				if (startArray == 2 && lengthArray == 3) {
					week.set({	
							user: auth.currentUser.email,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 2, 4
				if (startArray == 2 && lengthArray == 4) {
					week.set({	
							user: auth.currentUser.email,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 2, 5
				if (startArray == 2 && lengthArray == 5) {
					week.set({	
							user: auth.currentUser.email,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 2, 6
				if (startArray == 2 && lengthArray == 6) {
					week.set({	
							user: auth.currentUser.email,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 2, 7
				if (startArray == 2 && lengthArray == 7) {
					week.set({	
							user: auth.currentUser.email,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 2, 8
				if (startArray == 2 && lengthArray == 8) {
					week.set({	
							user: auth.currentUser.email,
							game2: document.getElementById('seasongame2').value,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value,
							game9: document.getElementById('seasongame9').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 2, 9
				if (startArray == 2 && lengthArray == 9) {
					week.set({	
							user: auth.currentUser.email,
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
				// the 3 set set
				// 3, 1
				if (startArray == 3 && lengthArray == 1) {
					week.set({	
							user: auth.currentUser.email,
							game3: document.getElementById('seasongame3').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 3, 2
				if (startArray == 3 && lengthArray == 2) {
					week.set({	
							user: auth.currentUser.email,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 3, 3
				if (startArray == 3 && lengthArray == 3) {
					week.set({	
							user: auth.currentUser.email,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 3, 4
				if (startArray == 3 && lengthArray == 4) {
					week.set({	
							user: auth.currentUser.email,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 3, 5
				if (startArray == 3 && lengthArray == 5) {
					week.set({	
							user: auth.currentUser.email,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 3, 6
				if (startArray == 3 && lengthArray == 6) {
					week.set({	
							user: auth.currentUser.email,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 3, 7
				if (startArray == 3 && lengthArray == 7) {
					week.set({	
							user: auth.currentUser.email,
							game3: document.getElementById('seasongame3').value,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value,
							game9: document.getElementById('seasongame9').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 3, 8
				if (startArray == 3 && lengthArray == 8) {
					week.set({	
							user: auth.currentUser.email,
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
				// the 4 set set
				// 4, 1
				if (startArray == 4 && lengthArray == 1) {
					week.set({	
							user: auth.currentUser.email,
							game4: document.getElementById('seasongame4').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 4, 2
				if (startArray == 4 && lengthArray == 2) {
					week.set({	
							user: auth.currentUser.email,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 4, 3
				if (startArray == 4 && lengthArray == 3) {
					week.set({	
							user: auth.currentUser.email,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 4, 4
				if (startArray == 4 && lengthArray == 4) {
					week.set({	
							user: auth.currentUser.email,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 4, 5
				if (startArray == 4 && lengthArray == 5) {
					week.set({	
							user: auth.currentUser.email,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 4, 6
				if (startArray == 4 && lengthArray == 6) {
					week.set({	
							user: auth.currentUser.email,
							game4: document.getElementById('seasongame4').value,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value,
							game9: document.getElementById('seasongame9').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 4, 7
				if (startArray == 4 && lengthArray == 7) {
					week.set({	
							user: auth.currentUser.email,
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
				// the 5 set set
				// 5, 1
				if (startArray == 5 && lengthArray == 1) {
					week.set({	
							user: auth.currentUser.email,
							game5: document.getElementById('seasongame5').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 5, 2
				if (startArray == 5 && lengthArray == 2) {
					week.set({	
							user: auth.currentUser.email,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 5, 3
				if (startArray == 5 && lengthArray == 3) {
					week.set({	
							user: auth.currentUser.email,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 5, 4
				if (startArray == 5 && lengthArray == 4) {
					week.set({	
							user: auth.currentUser.email,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 5, 5
				if (startArray == 5 && lengthArray == 5) {
					week.set({	
							user: auth.currentUser.email,
							game5: document.getElementById('seasongame5').value,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value,
							game9: document.getElementById('seasongame9').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 5, 6
				if (startArray == 5 && lengthArray == 6) {
					week.set({	
							user: auth.currentUser.email,
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
				// the 6 set set
				// 6, 1
				if (startArray == 6 && lengthArray == 1) {
					week.set({	
							user: auth.currentUser.email,
							game6: document.getElementById('seasongame6').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 6, 2
				if (startArray == 6 && lengthArray == 2) {
					week.set({	
							user: auth.currentUser.email,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 6, 3
				if (startArray == 6 && lengthArray == 3) {
					week.set({	
							user: auth.currentUser.email,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 6, 4
				if (startArray == 6 && lengthArray == 4) {
					week.set({	
							user: auth.currentUser.email,
							game6: document.getElementById('seasongame6').value,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value,
							game9: document.getElementById('seasongame9').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 6, 5
				if (startArray == 6 && lengthArray == 5) {
					week.set({	
							user: auth.currentUser.email,
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
				// the 7 set set
				// 7, 1
				if (startArray == 7 && lengthArray == 1) {
					week.set({	
							user: auth.currentUser.email,
							game7: document.getElementById('seasongame7').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 7, 2
				if (startArray == 7 && lengthArray == 2) {
					week.set({	
							user: auth.currentUser.email,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 7, 3
				if (startArray == 7 && lengthArray == 3) {
					week.set({	
							user: auth.currentUser.email,
							game7: document.getElementById('seasongame7').value,
							game8: document.getElementById('seasongame8').value,
							game9: document.getElementById('seasongame9').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 7, 4
				if (startArray == 7 && lengthArray == 4) {
					week.set({	
							user: auth.currentUser.email,
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
				// the 8 set set
				// 8, 1
				if (startArray == 8 && lengthArray == 1) {
					week.set({	
							user: auth.currentUser.email,
							game8: document.getElementById('seasongame8').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 8, 2
				if (startArray == 8 && lengthArray == 2) {
					week.set({	
							user: auth.currentUser.email,
							game8: document.getElementById('seasongame8').value,
							game9: document.getElementById('seasongame9').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 8, 3
				if (startArray == 8 && lengthArray == 3) {
					week.set({	
							user: auth.currentUser.email,
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
				// the 9 set set
				// 9, 1
				if (startArray == 9 && lengthArray == 1) {
					week.set({	
							user: auth.currentUser.email,
							game9: document.getElementById('seasongame9').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// 9, 2
				if (startArray == 9 && lengthArray == 2) {
					week.set({	
							user: auth.currentUser.email,
							game9: document.getElementById('seasongame9').value,
							game10: document.getElementById('seasongame10').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
				// the 10 set set
				// 10, 1
				if (startArray == 10 && lengthArray == 1) {
					week.set({	
							user: auth.currentUser.email,
							game10: document.getElementById('seasongame10').value
					}).then(function() {
						success();
					}).catch(err => {
						console.log("error: " + err.message);
						createForm.querySelector('.response').innerHTML = `<br><div class="alert alert-danger" role="alert">${err.message}</div>`;
					});
				}
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