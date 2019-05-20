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
        this.globalUser = user;

        this.firebase.favourites(user.uid).once("value", snapshot => {
          console.log(snapshot.val());
          this.setState({
            list: snapshot.val(),
            questList: this.props.data,
            loading: false,
          });
        });
      } else {
        this.props.history.push(ROUTES.SIGN_IN);
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

    const data = this.state.questList;
    console.log(data);
    const saved = Object.entries(this.state.list);
    console.log(saved);

    return (
      <div style={{ padding: '2em' }}>
        {saved.map(x =>
          <div key={x[0]}>
            <SavedQuestItem questId={x[0]} questData={data[x[0] - 1][1]} />
          </div>
        )}
      </div>);
  }
}


export default Favourites;

