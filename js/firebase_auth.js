function firebaseCreateNewUser(username, email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
        let user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: username
        }).then(function () { 
            firebase.database().ref("users/" + user.uid).update({
                "name": username
            });
        }, function (error) {
            console.log(error.code);
            console.log(error.message);
        });
    });
}

function firebaseLogin() {
    let email = $("#email").val();
    let password = $("#password").val();
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
        window.location.href = "./homepage.html";
    });
}

(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("logged in");
        } else {
            console.log("singed out");
        }
    });
})()