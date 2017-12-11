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

function fillJournalEditor(){
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('/journals/' + userId).once('value').then(function(snapshot) {
                var entryId = getParameterByName("entry");
                if(entryId !== null && entryId !== ''){
                    var journalEntries = snapshot.val();
                    var date = journalEntries[entryId].date;
                    var title = journalEntries[entryId].title;
                    var entry = journalEntries[entryId].entry;
                    document.getElementById("entryDate").valueAsDate = date;
                    document.getElementById("title").value = title;
                    var nic=nicEditors.findEditor('journalEntry');
                    nic.setContent(entry);
                } else {
                    document.getElementById('entryDate').valueAsDate = new Date()
                }
            });
        } else {
            document.getElementById('entryDate').valueAsDate = new Date()
        }
    });
}

function saveJournalEntry(){
    var entryId = getParameterByName("entry");
    var userId = firebase.auth().currentUser.uid;
    var title = document.getElementById("title").value;
    var date = document.getElementById("entryDate").value;
    // var entry = document.getElementById("journalEntry").value;
    var nic=nicEditors.findEditor('journalEntry');
    var entry = nic.getContent();
    if(date === ""){
        window.alert("Please choose a date for your entry.");
        return;
    }

    if(entryId !== null && entryId !== ''){
        firebase.database().ref('journals/' + userId + '/' + entryId).update({"date": date, "title": title, "entry": entry});
    } else {
        firebase.database().ref('journals/' + userId).push({"date": date, "title": title, "entry": entry});
        //firebase.database().ref('journals/' + userId).push({"date":[date], "title": title, "entry": entry});
        //window.location = rootURL + "journal/summary.html";
    }
    window.alert("Your journal entry has been saved.");
}

window.onload = function(){
    fillJournalEditor();
}