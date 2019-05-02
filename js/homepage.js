var globalUser;
var questArray = [1,2,3,4,5];
var currentQuest;


// //Change Title Bar to User Name's Garden
// firebase.auth().onAuthStateChanged(function(user){
// 	globalUser = user;
// 	//Get User's name and change the title to their garden.
// 	var ref = firebase.database().ref("users/" + user.uid);
// 	ref.on("value", function(snap) {
// 		var stringName = JSON.stringify(snap.val().name);
// 		stringName = stringName.substring(1, stringName.length -1);
//     });

//     questArray = [1];

    
// });


// loads first quest
$(document).ready(function () {
    currentQuest = questArray[0];
    loadQuest(currentQuest);
 })

// loads quest
function loadQuest(questId) {
    console.log("loading quest" + questId);
    var questRef = firebase.database().ref("quests/" + questId);
    questRef.on("value", function(snap) {
        // grab quest info from firebase
        var questName = JSON.stringify(snap.val().name);
        // remove quotation marks
        questName = questName.substring(1, questName.length -1);

        var questCost = JSON.stringify(snap.val().cost);

        var questDescription = JSON.stringify(snap.val().description);
        questDescription = questDescription.substring(1, questDescription.length -1);

        var questEcoRating = JSON.stringify(snap.val().ecoRating);

        var questImgLink = JSON.stringify(snap.val().imgLink);
        questImgLink = questImgLink.substring(1, questImgLink.length -1);

        var questLink = JSON.stringify(snap.val().link);
        questLink = questLink.substring(1, questLink.length -1);

        var questLocation = JSON.stringify(snap.val().location);
        questLocation = questLocation.substring(1, questLocation.length -1);

        var questTags = JSON.stringify(snap.val().tags);

        // display quest info
        $("#questTitle").html(questName);
        $("#questDescription").html(questDescription);
        $("#questLocation").html(questLocation);
        $("#questImgLink").attr("src", questImgLink);
        $("#questLink").attr("href", questLink);

        // display number of stars based on questEcoRating (1-3)

        if(questEcoRating == 1) {
            $("#ecoTwo").css("display", "none");
            $("#ecoThree").css("display", "none");
        } else if(questEcoRating == 2) {
            $("#ecoTwo").css("display", "inline-block");
            $("#ecoThree").css("display", "none");
        } else {
            $("#ecoTwo").css("display", "inline-block");
            $("#ecoThree").css("display", "inline-block");
        }
        

    })
 }

 $( "#save_button" ).click(function() {
    let index = questArray.indexOf(currentQuest);
    currentQuest = questArray[index + 1];
    console.log(currentQuest);
    loadQuest(currentQuest);
  });