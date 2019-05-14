import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../WIP/home.css';
import KeyboardRightArrow from '@material-ui/icons/KeyboardArrowRight';
import KeyboardLeftArrow from '@material-ui/icons/KeyboardArrowLeft';

class Buttons extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            qindex: props.qindex,
            nQuests: props.numOfQuests,
        };
    }

    nextQuest = () => {
        this.setState({
            qindex: this.state.qindex + 1,
        })
        console.log(this.state.qindex); 
    }

    prevQuest = () => {
        this.setState({
            qindex: this.state.qindex - 1,
        })
        console.log(this.state.qindex);
    }
    render() {
        return(
            <div id = "buttonBar" >
               <KeyboardLeftArrow id = "leftArrow" onClick = {(e) => this.prevQuest(e)}/>
               <KeyboardRightArrow id ="rightArrow" onClick = {(e) =>this.nextQuest(e)}/>
            </div>
        );
    }

    
}

export default Buttons;