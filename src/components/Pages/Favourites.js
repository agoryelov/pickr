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
      </div>);
  }
}


export default Favourites;

