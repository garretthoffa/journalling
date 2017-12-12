var rootURL = "http://ec2-18-221-5-177.us-east-2.compute.amazonaws.com:3006/journalling/";

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
                var link = "<a href=\"" + rootURL + "journal/editor.html?entry=" + entryId + "\">Edit Entry<\a>";
                var journalEntries = snapshot.val();
                var date = journalEntries[entryId].date;
                var title = journalEntries[entryId].title;
                var entry = journalEntries[entryId].entry;
                document.getElementById("date").innerHTML = date;
                document.getElementById("edit-link").innerHTML = link;
                document.getElementById("title").innerHTML = title;
                document.getElementById("entry").innerHTML = entry;
            });
        }
    });
}

function downloadAsFile()
{
//	var fileSaver = require('file-saver');
	var entry = document.getElementById("entry").innerHTML;
	var blob = new Blob([entry], {type: "text/plain;charset=utf-8"});
	var title = document.getElementById("title").innerHTML;
	var date = document.getElementById("date").innerHTML;
	var title = title+ " "+ date +".txt"
	saveAs(blob,title);
}
window.onload = function(){
    fillJournalEntry();
}
