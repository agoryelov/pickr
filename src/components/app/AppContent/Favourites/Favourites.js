import React, { cloneElement } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactSearchBox from 'react-search-box';
import Firebase from '../../../firebase'
import '../../../css/Favourites.css';
import 'rc-swipeout/assets/index.css';

import SavedQuestItem from './SavedQuestItem';

import '../../../css/QuestPage.css'

// The Favourites tab which displays the user's favourited (saved) quests
class Favourites extends React.Component {
  // Call access to the Firebase database.
  firebase = new Firebase();

  // Grab props from parent
  constructor(props) {
    super(props);

    this.state = {

      // List of all quests in the database
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

    // if the user is signed in, grab both a master list of all quest and a list of quests favourited by the user,
    // then set loading to false so the page renders its content
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
    // if the user is not logged in or the page is still grabbing user data from firebase
    if (this.state.loading) {
      // show circular loading icon
      return (
        <div style={{ marginTop: '40vh', display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      );
    }

    // if the user has no favourited quest return empty favourite list
    if (this.state.list == null) {
      return(<div style={{color: 'darkgrey', margin: '2em', textAlign: 'center'}}>No saved quests</div>)
    }

    // convert the master quest list (object) pulled from firebase into an array
    const data = Object.entries(this.state.questList);

    // convert the favourited quest list (object) pulled from firebase into an array
    const saved = Object.entries(this.state.list);

    const searches = [];
    
    // adds saved items into array of key value pairs     
    for(let i = 0; i < saved.length; i++) {
      searches.push({key: saved[i][0], value:data[saved[i][0]][1]["name"]})
    }

    return (
      <div style={{ padding: '2em' }}>
        <ReactSearchBox 
        placeholder="Search quests"
        value = "Find quests"
        data = {searches}
        callback={record =>console.log(record)}
        />

          <br/>
          {saved.map(x =>
      <div key={x[0]}>
        <SavedQuestItem questId={x[0]} globalUser = {this.state.globalUser} questData={data[x[0]][1]} />
          </div>)}

      </div>);
  }


}




export default Favourites;

