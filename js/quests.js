var globalUser;

firebase.auth().onAuthStateChanged(function(user){
	if (user) {
		globalUser = user;
		console.log("user: " + user.uid);
	} else {
		console.log("not logged in");
	}
			ShowFavourites();

});

$(document).ready(function() {
	if(globalUser) {
		ShowFavourites();
	}
});

function ShowFavourites() {
	var dbRef = firebase.database().ref("users/" + globalUser.uid + "/favourites");
	var promise = dbRef.once("value", function(snap){
		list = snap.val();
	});
	promise.then(function(){
        DisplayList(list); 
		console.log(list);
    });
}

function DisplayList(list){
	for (var i = 0; i < list.length; i++) {
		if (list[i] != undefined) {
			var questID = list[i].questID;
			var savedDate = questID.savedDate;
			DisplayQuest(questID, savedDate);
			console.log(savedDate);
		}

	}
}

function DisplayQuest(questID, savedDate) {

	var questRef = firebase.database().ref("quests/" + questID);
    questRef.on("value", function(snap) {
        // grab quest info from firebase
        var questName = JSON.stringify(snap.val().name);
        // remove quotation marks
        questName = questName.substring(1, questName.length -1);

        var questDescription = JSON.stringify(snap.val().description);
        questDescription = questDescription.substring(1, questDescription.length -1);

		let questItem = $("<div id = 'quest" + questID + "' class='questItem'></div>");
		let questTitle = $("<h3 id = 'questTitle" + questID + "' class='questTitles'></h3>");
		let questDate = $("<div class = 'date'></div>");

		$("#sortList").append(questItem, questTitle, questDate);

		questItem.append(questTitle);

		questTitle.text(questName);



	});




}

