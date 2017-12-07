var rootURL = "http://ec2-18-221-5-177.us-east-2.compute.amazonaws.com:3006/journalling/";

function getJournalTest(){
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('/journals/' + userId).once('value').then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key;
                    var childData = childSnapshot.val();
                    var link = "<li><a href=\"" + rootURL + "journal/editor.html?entry=" + key + "\">" + childData.date + " " + childData.title + "</a></li>"
                    document.getElementById("entry-list").innerHTML += link;                
                    console.log(childData);
                });
            });
        }
    });
}

window.onload = function(){
    //getJournalEntries();
    getJournalTest();
}
