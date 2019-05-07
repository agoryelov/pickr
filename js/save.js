var globalUser;

firebase.auth().onAuthStateChanged(function(user){
	if (user) {
		globalUser = user;
		console.log("user: " + user.uid);
	} else {
		console.log("not logged in");
	}

});

$('#setSave').click(function(){
  var savedItems = $('.catGroupsclicked').length;

  var categories = [];
  for(let i = 0; i < 11; i++) {
    categories[i] = true;
  }

  var prefCats = [];
  var clickedCats = document.getElementsByClassName('catGroupsclicked');
  for(let i = 0; i < savedItems; i++) {
    prefCats[i] = clickedCats[i].getElementsByTagName("h2")[0].innerHTML;
    saveToDatabase(prefCats[i]);
  }
});

$('#catReset').click(function(){
    var unclickedCats = document.getElementsByClassName('catGroupsunclicked');
    var count = 0;
    while(unclickedCats.length != 0) {
      unclickedCats[count].getAttribute("class");
      unclickedCats[count].setAttribute("class", "catGroupsclicked");
    }
});

function saveToDatabase(category) {
  firebase.database().ref("users/"+ globalUser.uid + "/preferences/" + (category)).update({
    "status" : "yes"
});
}