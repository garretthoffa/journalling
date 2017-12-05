function getJournalEntries(){
    var userId = firebase.auth().currentUser.uid;
    var posts = firebase.database().ref().child(userId);
    console.log(posts);
}

window.onload = function(){
    getJournalEntries();
}