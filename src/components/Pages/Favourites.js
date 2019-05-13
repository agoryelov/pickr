import React from "react";
import Firebase from '../../firebase';
import 'bootstrap/dist/css/bootstrap.css';


var globalUser;

var firebase = new Firebase();

firebase.auth().onAuthStateChanged(function(user){
	if (user) {
		globalUser = user;
		console.log("user: " + user.uid);
	} else {
		console.log("not logged in");
	}
			ShowFavourites();

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
			List(list[i]);
		}

	}
}

function List(props) {
  return <h1> {props.questID} </h1>;
  
}



class Favourites extends React.Component {

    componentDidMount() {
      ShowFavourites();
    }
    
    render() {
        return (
            <List />
        );
    }
}

export default Favourites;