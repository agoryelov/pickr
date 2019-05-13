import React from "react";

class SampleClass extends React.Component {
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
        return(<div>Example Div</div>)
    }
}

export default SampleClass;