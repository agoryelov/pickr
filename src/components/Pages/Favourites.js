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
      questList: this.props.data,

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
        this.globalUser = user;

        this.firebase.favourites(user.uid).once("value", snapshot => {
          console.log(snapshot.val());
          this.setState({
            list: snapshot.val(),
            loading: false,
          });
          this.updateFavouriteArray();
        });

        this.firebase.completed(user.uid).once("value", snapshot => {
          console.log(snapshot.val());
          this.setState({
            completed: snapshot.val(),
          });
          this.updateCompletedArray();
        });
      } else {
        this.props.history.push(ROUTES.SIGN_IN);
      }

    });
  }

  // updates user Favourite Quests array
  updateFavouriteArray() {
    let array = [];
    
    for (var quest in this.state.list) {
      let questID = this.state.list[quest].questID;
      let savedDate = this.state.list[quest].savedDate;
      let currentQuest = {
        questID: questID,
        savedDate: savedDate
      };
      array.push(currentQuest);
    }
    this.setState({
      favouriteArray: array,
    });
  }

  updateCompletedArray() {
    let array = [];
    for (var quest in this.state.completed) {
      let questID = this.state.completed[quest].questID;
      let completedDate = this.state.completed[quest].completedDate;
      let currentQuest = {
        questID: questID,
        completedDate: completedDate,
      };
      array.push(currentQuest);
    }
    this.setState({
      completedArray: array,
    });
  }

  // deletes the quest associated with the delete button that called this
  deleteQuest(event) {
    this.firebase.favourites(this.globalUser.uid).child(event.currentTarget.value).remove();

    this.firebase.favourites(this.globalUser.uid).once("value", snapshot => {
      this.setState({
        list: snapshot.val(),
      });

      this.updateFavouriteArray();

    });
  }

  // completes the quest associated with the completed button that called this
  completeQuest(event) {
    let now = new Date().toString(' MMMM d yyyy');
    this.firebase.completed(this.globalUser.uid).child(event.currentTarget.value).update({
      questID: event.currentTarget.value,
      completedDate: now
    });

    this.firebase.favourites(this.globalUser.uid).child(event.currentTarget.value).remove();

    this.firebase.favourites(this.globalUser.uid).once("value", snapshot => {
      this.setState({
        list: snapshot.val(),
      });

      this.updateFavouriteArray();

    });

    this.updateProgressArray(event.currentTarget.value);

    this.updateProgressXP();

    this.firebase.completed(this.globalUser.uid).once("value", snapshot => {
      this.setState({
        completed: snapshot.val(),
      });

      this.updateCompletedArray();

    });
  }

  // update progressArray before adding xp of quest to be completed
  updateProgressArray(quest) {
    console.log("xp");
    console.log(quest);
    let array = [];
    console.log(this.state.questList[quest].categories)
    for (var category in this.state.questList[quest].categories) {
      let currentCategory = category;
      let currentXP = this.state.questList[quest].categories[category];
      let progressXP = {
        category: currentCategory,
        xp: currentXP,
      };

      this.state.progressArray = array;
      console.log(this.state.progressArray);
    }
  }

  updateProgressXP() {
    this.firebase.categoryProgress(this.globalUser.uid).once("value", snapshot => {
      let userXP = snapshot.val();
      console.log(snapshot.val());

      for (var category in this.state.progressArray) {
        let categoryTag = this.state.progressArray[category].category
        this.firebase.categoryProgress(this.globalUser.uid).update({
          [categoryTag]: this.state.progressArray[category].xp + userXP[categoryTag]
        });
      }
    });
  }


  // deletes the quest associated with the delete button that called this
  clearQuest(event) {
    this.firebase.completed(this.globalUser.uid).child(event.currentTarget.value).remove();
    this.firebase.completed(this.globalUser.uid).once("value", snapshot => {
      this.setState({
        completed: snapshot.val(),
      });
      this.updateCompletedArray();
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

    const data = this.state.questList;
    const saved = Object.entries(this.state.list);

    return (
      <div style={{ padding: '2em' }}>
        {saved.map(x =>
          <div key={x[0]}>
            <SavedQuestItem questData={data[x[0]][1]} />
          </div>
        )}
      </div>);
  }
}


export default Favourites;

