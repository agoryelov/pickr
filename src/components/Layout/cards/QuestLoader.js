import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../WIP/home.css';

class QuestLoader extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
        <div id = "cardHolder3">
            <div id = "cardAct" className = "card" style = {{borderTop: 'none', borderBottom: 'none', opacity: this.state.opacity, transform: this.state.transformation}}>
             <img id = "questImgLink" className = "card-img" src = {this.pQuestImg} alt ="bikingImage"/>
             <div className = "card-img-overlay">
              <h4 id = "questTitle" className = "card-title" style = {cardFont}>{this.pQuestName}</h4>
              <Costs questCost = {this.state.pQuestCost} loaded = {this.state.loaded}/>
        
              <h4 id = "distance" className = "card-text" style = {cardFont}>12 km</h4>
              <EcoRatings questEco = {this.state.pQuestEco} loaded = {this.state.loaded}/>
            </div>
      
            </div>
            <div className = "card-body">
       
             <p id = "questDescription" className = "card-text" >{this.pQuestDes}</p>
              <p id = "questTags" className = "card-text">{this.pQuestTags}</p>
             <p className = "card-text"> <a href = {this.state.pQuestLink} >Click for more info</a></p>
             <br/>
             <p id ="questLocation" className = "card-text"><img className = "icons" src = {ping} alt = "location"/>
               {this.pQuestLoc}
             </p>
             <p id ="questLocation" className = "card-text"><img className = "icons" src = {clock} alt = "location"/>
             </p>
            </div>
        </div> 
        )
    }
}

export default QuestLoader;