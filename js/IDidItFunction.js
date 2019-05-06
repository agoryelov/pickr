function completedQuest(currentQuest) {
    let date = new Date();
    let user = firebase.auth().currentUser;
    
    if (user) {
        firebase.database().ref("users/" + user.uid + "/favourites/" + currentQuest).update({
            "completedDate": date.getDate
        });
    }
}

