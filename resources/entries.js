function getJournalTest(){
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('/journals/' + userId).once('value').then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key;
                    var childData = childSnapshot.val();                
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
