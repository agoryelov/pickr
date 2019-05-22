import React from "react";

class FirebaseSubmit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sampleData: "test",
        };
    }

    componentDidMount() {
        console.log('I mounted!');
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <div>
                    <form>
                        <label>Quest Name: </label>
                        <input type="text" /> <br />
                        <label>Quest Picture: </label>
                        <input type="text" /> <br />
                        <input type='submit' value="create" />
                    </form>
                </div>
            </div>)
    }
}

export default FirebaseSubmit;