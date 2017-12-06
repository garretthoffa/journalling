function getJournalEntries(){
    var userId = firebase.auth().currentUser.uid;
    var posts = firebase.database().ref().child(userId);
    console.log(posts);
}


function getJournalTest(){
firebase.auth().onAuthStateChanged(function(user){

if(user){
var userId = firebase.auth().currentUser.uid;
return firebase.database().ref('/journals/' + userId).once('value').then(function(snapshot) {
  var username = (snapshot.val()) || 'Anonymous';
  console.log(username); 
// ...
});
}
});
}
window.onload = function(){
    //getJournalEntries();
    getJournalTest();
}
