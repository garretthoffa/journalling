var rootURL = "http://ec2-18-221-5-177.us-east-2.compute.amazonaws.com/git/journalling/";
//var rootURL = "file:///D:/tsmit/Documents/CS356/journalling/";

function addNavigationBar() {
    var topNav = document.getElementById("top-nav");
    var homeLink = "<li><a href=\"" + rootURL + "index.html\">Home</a></li>";
    var myJournalLink = "<li><a href=\"" + rootURL + "journal/summary.html\">My Journal</a></li>";
    var loginLink = "<li><a href=\"" + rootURL + "login.html\">Login</a></li>";
    var topNavContent = "<ul>" + homeLink + myJournalLink + loginLink + "</ul>";
    topNav.innerHTML = topNavContent;
}

addNavigationBar();