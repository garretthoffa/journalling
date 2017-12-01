var rootURL = "http://ec2-18-221-5-177.us-east-2.compute.amazonaws.com/git/journalling/";
//var rootURL = "file:///D:/tsmit/Documents/CS356/journalling/";

function addNavigationBar() {
    var topNav = document.getElementById("top-nav");
    var homeLink = "<li><a href=\"" + rootURL + "index.html\">Home</a></li>";
    var myJournalLink = "<li><a href=\"" + rootURL + "journal/summary.html\">My Journal</a></li>";
    var loginLink = "<li><a href=\"" + rootURL + "login.html\">Login</a></li>";
    var topNavContent = "<ul id=\"top-nav-list\">" + homeLink + myJournalLink + loginLink + "</ul>";
    topNav.innerHTML = topNavContent;
}

function addFirebase(){
   var config = {
    apiKey: "AIzaSyCx28v6bZBNW2fq2mbPZl09tt5SZr2bFSg",
    authDomain: "r-journaling.firebaseapp.com",
    databaseURL: "https://r-journaling.firebaseio.com",
    projectId: "r-journaling",
    storageBucket: "r-journaling.appspot.com",
    messagingSenderId: "296381439395"
  };
  firebase.initializeApp(config);
}

function createNewJournalEntry(){
    window.location = rootURL + "journal/editor.html";
}

function loginUser(){
    toggleSignIn();
    window.location = rootURL + "journal/summary.html";
}

function sendToUserCreation(){
    window.location = rootURL + "create.html";
}

function createUser(){
  handleSignUp();
  loginUser();
  sendEmailVerification();
}

function saveJournalEntry(){
    window.alert("The save functionality has not been completed yet.");
}

function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
      document.getElementById('quickstart-sign-in').disabled = true;
    }

    /**
     * Handles the sign up button press.
     */
    function handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      var confirmPassword = document.getElementById('confirmPassword').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      if (password !== confirmPassword){
        alert('Passwords do not match.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    }

    /**
     * Sends an email verification to the user.
     */
    function sendEmailVerification() {
      // [START sendemailverification]
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
      });
      // [END sendemailverification]
    }

    function sendPasswordReset() {
      var email = document.getElementById('email').value;
      // [START sendpasswordemail]
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END sendpasswordemail];
    }

addFirebase();
addNavigationBar();
