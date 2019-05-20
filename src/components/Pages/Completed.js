import React from "react";

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
        }
    }
    
    render() {
        return(<div>Example Div</div>)
    }
}

export default Completed;