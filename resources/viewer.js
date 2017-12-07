function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function fillJournalEntry(){
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('/journals/' + userId).once('value').then(function(snapshot) {
                var entryId = getParameterByName("entry");
                var date = snapshot[entryId].date;
                var title = snapshot[entryId].title;
                var entry = snapshot[entryId].entry;
                document.getElementById("date").innerHTML = date;
                document.getElementById("title").innerHTML = title;
                document.getElementById("entry").innerHTML = entry;
            });
        }
    });
}

window.onload = function(){
    fillJournalEntry();
}