import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../WIP/home.css';
import KeyboardRightArrow from '@material-ui/icons/KeyboardArrowRight';
import KeyboardLeftArrow from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';

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
    }

    
    saveButton = () => {
        var today = new Date().toString('MMMM d yyyy');
        this.state.favorites.update({
          "questID": this.state.qindex,
          "savedDate": today,
        });
      }

    prevQuest = () => {
        this.setState({
            qindex: this.state.qindex - 1,
        })
    }
    render() {
        return(
            <div id = "buttonBar" >
               <KeyboardLeftArrow id = "leftArrow" onClick = {(e) => this.prevQuest(e)}/>
               <IconButton color="inherit" onClick = {this.saveButton}><BookmarkBorder/></IconButton> 
               <KeyboardRightArrow id ="rightArrow" onClick = {(e) =>this.nextQuest(e)}/>
            </div>
        );
    }

    
}

export default Buttons;