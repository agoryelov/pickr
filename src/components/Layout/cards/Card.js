import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import EcoRatings from './EcoRatings';
import Costs from './Costs';
import '../../WIP/home.css';
import clock from '../../Layout/images/clock.png';
import ping from '../../Layout/images/ping_icon.png';
import Firebase from '../../firebase';
import Buttons from './ButtonBar';

const cardFont = {color: 'white', textShadow: '0px 0px 4px black'};
var currX, currY;
const minMove = 250;
var centreX, centreY, translationX, translationY;
var rotation_grab;
var rotatingCard;

class Card extends Component {
  firebase = new Firebase();
  constructor(props) {
    super(props);
    
    this.state = {
        authUser: null,
        quest: null,
        qindex: 2,
        questName: null,
        questImg: null,
        questCost: null,
        questDes: null,
        questLoc: null,
        questAdd: null,
        questTags: null,
        questEco: null,
        numOfQuests: 9,
        questLink: null,

        loaded: 0,
        opacity: 1,
        transformation: 'none',
    };
    this.tinder = this.tinder.bind(this);
    this.accessLocation();
  }
    
    onSwipeMove(event) {
      console.log("You tapped!");
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

   indexRedone = () => {
      if(this.state.qindex > this.state.numOfQuests) {
        this.setState({
          qindex: 1,
        }
        );
      } else if (this.state.qindex < 1) {
        this.setState({
           qindex: this.state.numOfQuests,
        }); 
      }
    }

    showPosition = (position) => {
      this.setState({
        userOrigin: position.coords.latitude + ", " + position.coords.longitude,
      })
    }

    accessLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        console.log("Geolcation is not supported by this browser!");
      }
    }

  componentDidMount() {
    this.firebase.auth.onAuthStateChanged((authUser) => {
      console.log(authUser);  
      if (authUser) {
            this.setState({ 
              authUser: authUser,
              favorites: this.firebase.favourites(authUser.uid, this.state.qindex), 
            }, () => {console.log(this.state.favorites);});
            
        } else {
            this.setState({ authUser: null });
        }
    });
    
    rotatingCard = document.getElementById("cardAct");
    this.loadQuest();
    }

    mouseDownAction = (event1) => {
      currX = 0;
      currY = 0;
      centreX = event1.clientX;
      centreY = event1.clientY;
      console.log(rotatingCard);
      this.setState({
        mouseBind: this.mouseSwipeAction,
      });
    }

    helloWorld = () => {
      console.log("");
    }

    mouseSwipeAction = (event2) => {
      console.log(event2.target);
      event2.preventDefault();
      translationX = event2.clientX - centreX;
      currX += translationX;
      console.log(translationX);
      translationY = event2.clientY - centreY;
      currY += translationY;

      rotation_grab = Math.atan(Math.abs(translationY) / translationX) * 180/Math.PI;
      this.tinder(translationX, translationY, "0.1s");
    }

    mouseUpAction = () => {
      this.setState({
        mouseBind: this.helloWorld}, () => {this.tinder(0, 0, "0.8s");
      });
      if(translationX > minMove) {
        this.setState({
          qindex: this.state.qindex + 1},()=>{this.indexRedone()
        });
      } else if(translationX < -1*minMove) {
        this.setState({
          qindex: this.state.qindex - 1},()=>{this.indexRedone()
        });
        
      }
      console.log(this.state.qindex);
 
      this.loadQuest();
    }

    mouseLeaveAction = () => {
      this.setState({
        mouseBind: this.helloWorld,
      });
      this.tinder(0, 0, "0.8s");
    }

    tinder = (Xpixels, Ypixels, speed) => {
      rotatingCard.setAttribute("style","transform:translateX(" + Xpixels + "px) translateY(" + Ypixels + "); transition: " +speed);
      return (
        rotatingCard
      );
    }


  render () {
    return (
  
      <div id = "cardAct" style = {{marginTop: 0, paddingTop: 0}}  onMouseMove ={this.state.mouseBind} onMouseDown = {this.mouseDownAction} onMouseLeave = {this.mouseLeaveAction} onMouseUp ={this.mouseUpAction}>
        
          <div className = "card" style = {{borderTop: 'none', borderBottom: 'none', opacity: this.state.opacity, transform: this.state.transformation}}>
           <img id = "questImgLink" className = "card-img" src = {this.questImg} alt ="bikingImage"/>
           <div className = "card-img-overlay">
            <h4 id = "questTitle" className = "card-title" style = {cardFont}>{this.questName}</h4>
            <Costs questCost = {this.state.questCost} loaded = {this.state.loaded}/>
      
            <h4 id = "distance" className = "card-text" style = {cardFont}>12 km</h4>
            <EcoRatings questEco = {this.state.questEco} loaded = {this.state.loaded}/>
          </div>
    
          </div>
          <div className = "card-body">
           {/** <CalcJourney userOrigin = {this.state.userOrigin} questAdd = {this.state.questAdd}/>*/}
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
  
     <Buttons qindex = {this.state.qindex}>
     
     </Buttons>
     
     
    
    </div>
    )
    
  }
};

export default Card;