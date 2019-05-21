import React, { cloneElement } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Firebase from '../firebase'
import '../CSS/Favourites.css';
import * as ROUTES from '../../constants/routes';
import 'rc-swipeout/assets/index.css';


import Swipeout from 'rc-swipeout';

import SavedQuestItem from '../Layout/SavedQuests/SavedQuestItem';

import '../CSS/QuestPage.css'


class Favourites extends React.Component {
  firebase = new Firebase();
  constructor(props) {
    super(props);

    this.state = {

      // List of all quests
      questList: null,

      // List of quests favourited by the user (pulled from firebase)
      list: null,

      // List of quests completed by the user (pulled from firebase)
      completed: null,

      // Boolean set to true until user is logged in and list updated
      loading: true,

      // current user
      globalUser: null,

      // an array of quests favourited by the user
      favouriteArray: [],

      // an array of quests completed by the user
      completedArray: [],

      // an array of xp by categories the current completed quest will reward
      progressArray: [],

    };
  }

  componentDidMount() {
    this.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.state.globalUser = user;

        this.firebase.questsAll().once("value", snapshot => {
          this.setState({ questList: snapshot.val() });
        }).then(() => {
          this.firebase.favourites(user.uid).on("value", snapshot => {
            this.setState({ list: snapshot.val(), loading: false });
          });
        });
      }
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div style={{ marginTop: '40vh', display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      );
    }

    if (this.state.list == null) {
      return(<div>Empty</div>)
    }

    const data = Object.entries(this.state.questList);
    const saved = Object.entries(this.state.list);

    return (
      <div style={{ padding: '2em' }}>
        {saved.map(x =>
          <div key={x[0]}>
            <SavedQuestItem questId={x[0]} globalUser = {this.state.globalUser} questData={data[x[0]][1]} />
          </div>
        )}
                  <div>{this.createForm()}</div>
      </div>);
  }

  addQuestToDB(e) {
    e.preventDefault();

    let questSize = null;

    this.firebase.questsAll().once("value", snapshot => {
      questSize = snapshot.val().length;
    }).then(() => {this.firebase.questsAll().child(questSize).update({
      address: this.inputQuestAddress.value,
      cost: this.inputQuestCost.value,
      description: this.inputQuestDescription.value,
      ecoRating: this.inputQuestEcoRating.value,
      imgLink: this.inputQuestImgLink.value,
      link: this.inputQuestLink.value,
      location: this.inputQuestLocation.value,
      name: this.inputQuestName.value,
      tags: this.inputQuestTags.value,
    });
    this.firebase.quests(questSize).child('coordinates').update({
      lat: this.inputQuestLat.value,
      long: this.inputQuestLong.value,
    });
    this.firebase.quests(questSize).child('categories').update({
      [this.inputQuestCat1.value]: this.inputQuestCat1XP.value,
    });
    if (!(this.inputQuestCat2.value === "" || this.inputQuestCat2XP.value === "")) {
      this.firebase.quests(questSize).child('categories').update({
        [this.inputQuestCat2.value]: this.inputQuestCat2XP.value,
      });
    };
    if (!(this.inputQuestCat3.value === "" || this.inputQuestCat3XP.value === "")) {
      this.firebase.quests(questSize).child('categories').update({
        [this.inputQuestCat3.value]: this.inputQuestCat3XP.value,
      });
    };
  });

  }


  createForm() {
    let form = 
    <form onSubmit = {this.addQuestToDB.bind(this)}>
        <input type = "text" name = "questAddress" ref = {questAddress => this.inputQuestAddress = questAddress} placeholder = "address" required = "required"></input>
        <input type = "number" name = "questCost" ref = {questCost => this.inputQuestCost = questCost} placeholder = "cost" required = "required"></input>
        <input type = "text" name = "questDescription" ref = {questDescription => this.inputQuestDescription = questDescription} placeholder = "description" required = "required"></input>
        <input type = "number" name = "questEcoRating" ref = {questEcoRating => this.inputQuestEcoRating = questEcoRating} placeholder = "eco rating" required = "required"></input>
        <input type = "text" name = "questImgLink" ref = {questImgLink => this.inputQuestImgLink = questImgLink} placeholder = "img link" required = "required"></input>
        <input type = "text" name = "questLink" ref = {questLink => this.inputQuestLink = questLink} placeholder = "link" required = "required"></input>
        <input type = "text" name = "questLocation" ref = {questLocation => this.inputQuestLocation = questLocation}  placeholder = "location" required = "required"></input>
        <input type = "text" name = "questName" ref = {questName => this.inputQuestName = questName} placeholder = "name" required = "required"></input>
        <input type = "text" name = "questTags" ref = {questEcoTags => this.inputQuestTags = questEcoTags} placeholder = "tags" required = "required"></input>
        <input type = "number" name = "questLong" ref = {questLong => this.inputQuestLong = questLong} placeholder = "long" required = "required"></input>
        <input type = "number" name = "questLat" ref = {questLat => this.inputQuestLat = questLat} placeholder = "lat" required = "required"></input>
        <input type = "text" name = "questCat1" ref = {questCat1 => this.inputQuestCat1 = questCat1} placeholder = "category 1" required = "required"></input>
        <input type = "number" name = "questCat1XP" ref = {questCat1XP => this.inputQuestCat1XP = questCat1XP} placeholder = "category 1 XP" required = "required"></input>
        <input type = "text" name = "questCat2" ref = {questCat2 => this.inputQuestCat2 = questCat2} placeholder = "category 2 (optional)"></input>
        <input type = "number" name = "questCat2XP" ref = {questCat2XP => this.inputQuestCat2XP = questCat2XP} placeholder = "category 2 XP (optional)"></input>
        <input type = "text" name = "questCat3" ref = {questCat3 => this.inputQuestCat3 = questCat3} placeholder = "category 3 (optional)"></input>
        <input type = "number" name = "questCat3XP" ref = {questCat3XP => this.inputQuestCat3XP = questCat3XP} placeholder = "category 3 XP (optional)"></input>
        <input type = "submit" value = "submit"></input>
        
  
  
    </form>
  
    return form;
  }
}




export default Favourites;

