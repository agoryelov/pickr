import React from "react";
import Firebase from '../firebase'

class Completed extends React.Component {
    firebase = new Firebase();
    constructor(props) {
        super(props);

        this.state = {
            sampleData: "test",
        };
    }

    componentDidMount() {
        this.firebase.auth.onAuthStateChanged(user => {
            if (user) {
                //logged in
            } else {
                //not logged in
            }
        });
    }
    
    render() {
        return(
        <div>
            Completed Quests
        </div>)
    }
}

export default Completed;