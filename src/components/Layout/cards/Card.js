import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import EcoRatings from './EcoRatings';
import Costs from './Costs';
import '../../WIP/home.css';
import clock from '../../Layout/images/clock.png';
import ping from '../../Layout/images/ping_icon.png';
import Firebase from '../../firebase';
import Buttons from './ButtonBar';
import SwipeableViews from 'react-swipeable-views';

const cardFont = {color: 'white', textShadow: '0px 0px 4px black'};

class Card extends Component {
  firebase = new Firebase();
  constructor(props) {
    super(props);
    
    this.state = {
        authUser: null,
        quest: null,
        
        sindex: 0,
        qindex: 3,
        questName: null,
        questImg: null,
        questCost: null,
        questDes: null,
        questLoc: null,
        questAdd: null,
        questTags: null,
        questEco: null,
        numOfQuests: 6,
        access: false,
        userOrigin: null,
        questLink: null,

        nQuest: null,
        nQIndex: null,
        nQuestName: null,
        nQuestImg: null,
        nQuestCost: null,
        nQuestDes: null,
        nQuestLoc: null,
        nQuestAdd: null,
        nQuestTags: null,
        nQuestEco: null,
        nQuestLink: null,

        pQuest: null,
        pQIndex: null,
        pQuestName: null,
        pQuestImg: null,
        pQuestCost: null,
        pQuestDes: null,
        pQuestLoc: null,
        pQuestAdd: null,
        pQuestTags: null,
        pQuestEco: null,
        pQuestLink: null,

        loaded: 0,
        opacity: 1,

        transformation: 'none',
    };
  }
    
    onSwipeMove(event) {
      console.log("You tapped!");
    }

    showPosition = (position) => {
      this.setState({
        access: true,
        userOrigin: position.coords.latitude + ", " + position.coords.longitude,
      })
      console.log(this.state.userOrigin);
     // firstQuest();
      
    }

    accessLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        XMLDocument.innerHTML = "Geolcation is not supported by this browser!";
      }
    }

    loadQuest = () => {
      this.quest = this.firebase.quests(this.state.qindex);
      this.quest.on("value", snapshot => {
          this.questName = JSON.stringify(snapshot.val().name);
          this.questName = this.questName.substring(1, this.questName.length - 1);
          this.questImg = JSON.stringify(snapshot.val().imgLink);
          this.questImg = this.questImg.substring(1, this.questImg.length - 1);
          this.questLoc = JSON.stringify(snapshot.val().location);
          this.questLoc = this.questLoc.substring(1,this.questLoc.length - 1);
          this.questCost = JSON.stringify(snapshot.val().cost);
          this.questDes = JSON.stringify(snapshot.val().description);
          this.questDes = this.questDes.substring(1, this.questDes.length - 1);
          this.questAdd = JSON.stringify(snapshot.val().address);
          this.questAdd = this.questAdd.substring(1,this.questAdd.length - 1);
          this.questTags = JSON.stringify(snapshot.val().tags);
          this.questTags = this.questTags.substring(1, this.questTags.length - 1);
         
          this.questLink = JSON.stringify(snapshot.val().link);
          this.questLink = this.questLink.substring(1, this.questLink.length - 1);
          this.questEco = JSON.stringify(snapshot.val().ecoRating);
          this.setState({
              quest: this.quest,
              questName: this.questName,
              questImg: this.questImg,
              questCost: this.questCost,
              questDes: this.questDes,
              questLoc: this.questLoc,
              questAdd: this.questAdd,
              questTags: this.questTags,
              questEco: this.questEco,
              questLink: this.questLink,
              loaded: 1,
          })
      });
    }

    loadNextQuest = () => {
      this.nQuest = this.firebase.quests(this.state.qindex + 1);
      this.nQuest.on("value", snapshot => {
          this.nQuestName = JSON.stringify(snapshot.val().name);
          this.nQuestName = this.nQuestName.substring(1, this.nQuestName.length - 1);
          this.nQuestImg = JSON.stringify(snapshot.val().imgLink);
          this.nQuestImg = this.nQuestImg.substring(1, this.nQuestImg.length - 1);
          this.nQuestLoc = JSON.stringify(snapshot.val().location);
          this.nQuestLoc = this.nQuestLoc.substring(1,this.nQuestLoc.length - 1);
          this.nQuestCost = JSON.stringify(snapshot.val().cost);
          this.nQuestDes = JSON.stringify(snapshot.val().description);
          this.nQuestDes = this.nQuestDes.substring(1, this.nQuestDes.length - 1);
          this.nQuestAdd = JSON.stringify(snapshot.val().address);
          this.nQuestAdd = this.nQuestAdd.substring(1,this.nQuestAdd.length - 1);
          this.nQuestTags = JSON.stringify(snapshot.val().tags);
          this.nQuestTags = this.nQuestTags.substring(1, this.nQuestTags.length - 1);
         
          this.nQuestLink = JSON.stringify(snapshot.val().link);
          this.nQuestLink = this.nQuestLink.substring(1, this.nQuestLink.length - 1);
          this.nQuestEco = JSON.stringify(snapshot.val().ecoRating);
          this.setState({
              nQuest: this.nQuest,
              nQuestName: this.nQuestName,
              nQuestImg: this.nQuestImg,
              nQuestCost: this.nQuestCost,
              nQuestDes: this.nQuestDes,
              nQuestLoc: this.nQuestLoc,
              nQuestAdd: this.nQuestAdd,
              nQuestTags: this.nQuestTags,
              nQuestEco: this.nQuestEco,
              nQuestLink: this.nQuestLink,
              loaded: 1,
          })
      });
    }

    loadPrevQuest = () => {
      this.pQuest = this.firebase.quests(this.state.qindex - 1);
      this.pQuest.on("value", snapshot => {
          this.pQuestName = JSON.stringify(snapshot.val().name);
          this.pQuestName = this.pQuestName.substring(1, this.pQuestName.length - 1);
          this.pQuestImg = JSON.stringify(snapshot.val().imgLink);
          this.pQuestImg = this.pQuestImg.substring(1, this.pQuestImg.length - 1);
          this.pQuestLoc = JSON.stringify(snapshot.val().location);
          this.pQuestLoc = this.pQuestLoc.substring(1,this.pQuestLoc.length - 1);
          this.pQuestCost = JSON.stringify(snapshot.val().cost);
          this.pQuestDes = JSON.stringify(snapshot.val().description);
          this.pQuestDes = this.pQuestDes.substring(1, this.pQuestDes.length - 1);
          this.pQuestAdd = JSON.stringify(snapshot.val().address);
          this.pQuestAdd = this.pQuestAdd.substring(1,this.pQuestAdd.length - 1);
          this.pQuestTags = JSON.stringify(snapshot.val().tags);
          this.pQuestTags = this.pQuestTags.substring(1, this.pQuestTags.length - 1);
         
          this.pQuestLink = JSON.stringify(snapshot.val().link);
          this.pQuestLink = this.pQuestLink.substring(1, this.pQuestLink.length - 1);
          this.pQuestEco = JSON.stringify(snapshot.val().ecoRating);
          this.setState({
              pQuest: this.pQuest,
              pQuestName: this.pQuestName,
              pQuestImg: this.pQuestImg,
              pQuestCost: this.pQuestCost,
              pQuestDes: this.pQuestDes,
              pQuestLoc: this.pQuestLoc,
              pQuestAdd: this.pQuestAdd,
              pQuestTags: this.pQuestTags,
              pQuestEco: this.pQuestEco,
              pQuestLink: this.pQuestLink,
          })
      });
    }

   indexRedone = () => {
      if(this.state.qindex > this.state.numOfQuests - 1) {
        this.setState({
          qindex: 1,
        }
        )
      } else if (this.state.qindex < 0) {
        this.setState({
           qindex: this.state.numOfQuests,
        }) 
      }
    }

  componentDidMount() {
    this.firebase.auth.onAuthStateChanged((authUser) => {
        if (authUser) {
            this.setState({ authUser });
        } else {
            this.setState({ authUser: null });
        }
    });
    this.accessLocation();
    this.loadQuest();
    this.loadNextQuest();
    this.loadPrevQuest();
   
    }

    updateIndex = (index, value) => {
      if(index > value) {
        this.setState ({
          sindex: index,
          qindex: this.state.qindex + 1,
        });
      } else {
        this.setState ({
          sindex: index,
          qindex: this.state.qindex - 1,
        });
      }
      console.log(this.state.qindex);
      this.loadQuest();
      this.loadNextQuest();
      this.loadPrevQuest();
      console.log(index);
      console.log(value);
  }

  render () {
    return (
      <div style = {{marginTop: 0, paddingTop: 0}}>
         <SwipeableViews enableMouseEvents = {true} onChangeIndex = {this.updateIndex} >
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
         <div id = "cardHolder1">
          <div id = "cardAct" className = "card" style = {{borderTop: 'none', borderBottom: 'none', opacity: this.state.opacity, transform: this.state.transformation}}>
           <img id = "questImgLink" className = "card-img" src = {this.questImg} alt ="bikingImage"/>
           <div className = "card-img-overlay">
            <h4 id = "questTitle" className = "card-title" style = {cardFont}>{this.questName}</h4>
            <Costs questCost = {this.state.questCost} loaded = {this.state.loaded}/>
      
            <h4 id = "distance" className = "card-text" style = {cardFont}>12 km</h4>
            <EcoRatings questEco = {this.state.questEco} loaded = {this.state.loaded}/>
          </div>
    
          </div>
          <div className = "card-body">
     
        <p id = "questDescription" className = "card-text" >{this.questDes}</p>
        <p id = "questTags" className = "card-text">{this.questTags}</p>
       <p className = "card-text"> <a href = {this.state.questLink} >Click for more info</a></p>
        <br/>
        <p id ="questLocation" className = "card-text"><img className = "icons" src = {ping} alt = "location"/>
        {this.questLoc}
        </p>
        <p id ="questLocation" className = "card-text"><img className = "icons" src = {clock} alt = "location"/>
        </p>
      </div>
      </div>
      <div id = "cardHolder2">
          <div id = "cardAct" className = "card" style = {{borderTop: 'none', borderBottom: 'none', opacity: this.state.opacity, transform: this.state.transformation}}>
           <img id = "questImgLink" className = "card-img" src = {this.nQuestImg} alt ="bikingImage"/>
           <div className = "card-img-overlay">
            <h4 id = "questTitle" className = "card-title" style = {cardFont}>{this.nQuestName}</h4>
            <Costs questCost = {this.state.nQuestCost} loaded = {this.state.loaded}/>
      
            <h4 id = "distance" className = "card-text" style = {cardFont}>12 km</h4>
            <EcoRatings questEco = {this.state.nQuestEco} loaded = {this.state.loaded}/>
          </div>
    
          </div>
          <div className = "card-body">
     
           <p id = "questDescription" className = "card-text" >{this.nQuestDes}</p>
            <p id = "questTags" className = "card-text">{this.nQuestTags}</p>
           <p className = "card-text"> <a href = {this.state.nQuestLink} >Click for more info</a></p>
           <br/>
           <p id ="questLocation" className = "card-text"><img className = "icons" src = {ping} alt = "location"/>
             {this.nQuestLoc}
           </p>
           <p id ="questLocation" className = "card-text"><img className = "icons" src = {clock} alt = "location"/>
           </p>
          </div>
      </div>
     
      </SwipeableViews>
     <Buttons qindex = {this.state.qindex}/>
     
    </div>
    )
    
  }
};

export default Card;