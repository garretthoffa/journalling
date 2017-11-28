function addNavigationBar() {
    var topNav = document.getElementById("top-nav");
    var homeLink = "<li><a href=\"/index.html\">Home</a></li>";
    var myJournalLink = "<li><a href=\"/summary.html\">My Journal</a></li>";
    var loginLink = "<li><a href=\"/login.html\">Login</a></li>";
    var topNavContent = "<ul>" + homeLink + myJournalLink + loginLink + "</ul>";
    topNav.innerHTML = topNavContent;
}

addNavigationBar();