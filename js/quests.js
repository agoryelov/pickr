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
		console.log(list);
	});
	promise.then(function(){
        DisplayList(list);  //JSON object
		console.log(list);
    });
}

function DisplayList(list){
	for (var i = 0; i < list.length; i++) {
		if (list[i] != undefined) {
			var questID = list[i];
			var savedDate = questID.savedDate;
			console.log(savedDate + "hello");
		}

	}
}

function DisplayQuest(questID, savedDate) {




	
}

