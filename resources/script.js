//var rootURL = "http://ec2-18-221-5-177.us-east-2.compute.amazonaws.com/git/journalling/";
var rootURL = "file:///D:/tsmit/Documents/CS356/journalling/";

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
    window.location= rootURL + "journal/editor.html";
}

addFirebase();
addNavigationBar();
