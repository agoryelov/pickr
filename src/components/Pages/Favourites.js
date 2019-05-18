import React, { cloneElement } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Firebase from '../firebase'
import '../CSS/Favourites.css';
import * as ROUTES from '../../constants/routes';




class Favourites extends React.Component {
    firebase = new Firebase();
    constructor(props) {
        super(props);

        this.state = {

            // List of all quests
            questList: null,

            // List of quests favourited by the user
            list: null,

            // List of quests completed by the user
            completed: null,

            // Boolean set to true until user is logged in and list updated
            loading: true,

            // current user
            globalUser: null,

            // an array of quests favourited by the user
            favouriteArray: [],

            // an array of quests completed by the user
            completedArray: [],

            // an array of xp by categories the completed quest will reward
            progressArray: [],
        };
    }

    componentDidMount() {
      this.setState({ loading: true });

      // grab list of all quests in firebase and save to questList
      this.firebase.questsAll().once("value", snapshot => {
        console.log(snapshot.val());
        this.setState({ 
          questList: snapshot.val(),
        });
      });

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
      let array= [];
      for (var quest in this.state.list) {
        console.log(quest);
        let questID = this.state.list[quest].questID;
        let savedDate = this.state.list[quest].savedDate;
        let currentQuest = {
          questID: questID,
          savedDate: savedDate
        };
        console.log("adding quest");
        array.push(currentQuest);
      }
      this.setState({
        favouriteArray: array,
      });
    }

    updateCompletedArray() {
      let array= [];
      for (var quest in this.state.completed) {
        console.log(quest);
        let questID = this.state.completed[quest].questID;
        let completedDate = this.state.completed[quest].completedDate;
        let currentQuest = {
          questID: questID,
          completedDate: completedDate,
        };
        console.log("adding quest");
        array.push(currentQuest);
      }
      this.setState({
        completedArray: array,
      });
    }

    // deletes the quest associated with the delete button that called this
    deleteQuest(event) {
            console.log("quest to be deleted " + event.currentTarget.value);
            this.firebase.favourites(this.globalUser.uid).child(event.currentTarget.value).remove();

            this.firebase.favourites(this.globalUser.uid).once("value", snapshot => {
              console.log(snapshot.val());
              this.setState({ 
                list: snapshot.val(),  
              });

              this.updateFavouriteArray();

    });
  }

  // completes the quest associated with the completed button that called this
  completeQuest(event) {
    let now = new Date().toString(' MMMM d yyyy');;
    this.firebase.completed(this.globalUser.uid).child(event.currentTarget.value).update({
      questID : event.currentTarget.value,
      completedDate : now
    });

    this.firebase.favourites(this.globalUser.uid).child(event.currentTarget.value).remove();

    this.firebase.favourites(this.globalUser.uid).once("value", snapshot => {
      console.log(snapshot.val());
      this.setState({ 
        list: snapshot.val(),  
      });

      this.updateFavouriteArray();

    });

    this.updateProgressArray(event.currentTarget.value);


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
  for (var category in this.state.questList[quest].category) {
    let currentCategory =category;
    let currentXP = this.state.questList[quest].category[category];
    let progressXP = {
      category: currentCategory,
      xp: currentXP,
    };
    array.push(progressXP);
  };

  this.state.progressArray = array;
  console.log(this.state.progressArray);
}


      // deletes the quest associated with the delete button that called this
      clearQuest(event) {
        console.log("quest to be cleared " + event.currentTarget.value);
        this.firebase.completed(this.globalUser.uid).child(event.currentTarget.value).remove();

        this.firebase.completed(this.globalUser.uid).once("value", snapshot => {
          console.log(snapshot.val());
          this.setState({ 
            completed: snapshot.val(),  
          });

          this.updateCompletedArray();

});
}

    createList = () => {
      // Array of favourited quests in JSX syntax
      let favouriteList = []

      // if favourites quests list is empty render a blank list
      if(this.state.favouriteArray.length === 0) {
        console.log("no favourites");
        return <div>No Quests Favourited</div>
      }

      // if favourites quests list is not empty

      // iterate through every quest in favouriteArray and create a JSX list for the quest
      for (let i = 0; i < this.state.favouriteArray.length; i++) {
        console.log(i +" length " + this.state.favouriteArray.length);
        if (this.state.favouriteArray[i] != undefined) {

          let questName = JSON.stringify(this.state.questList[this.state.favouriteArray[i].questID].name);
          questName = questName.substring(1, questName.length -1);

          let questDescription = JSON.stringify(this.state.questList[this.state.favouriteArray[i].questID].description);
          questDescription = questDescription.substring(1, questDescription.length -1);

          // let questImageLink = JSON.stringify(this.state.questList[this.state.list[i].questID].imgLink);
          // questImageLink = questImageLink.substring(1, questImageLink.length -1);

          let savedDate = JSON.stringify(this.state.favouriteArray[i].savedDate);
          savedDate = savedDate.substring(1, savedDate.length -1);

          console.log("quest" + this.state.questList[this.state.favouriteArray[i].questID].name);
          favouriteList.push(
            <div className = "questContainer">
              <div className = "questTop">
                <div className = "questName">{questName}</div>
                <div className = "savedDate">
                  Saved: {savedDate}
                </div>
              </div>
              <div className = "questBottom">
              <div className = "questDescription">
                {questDescription}
              </div>
              <div className = "questButtons">
                <button className="delete" value = {this.state.favouriteArray[i].questID} onClick={this.deleteQuest.bind(this)
                  }>Delete
                </button>
                <button className="completed" value = {this.state.favouriteArray[i].questID} onClick={this.completeQuest.bind(this)
                  }>Completed!
                </button>
                <img src="../../red_x.png" />
        
              </div>

              </div>
 
            </div>
          
          )
        }
      }
      return favouriteList;
      
    }

    createCompletedList = () => {
      // Array of completed quests in JSX syntax
      let completedList = []

      // if completed quests list is empty render a blank list
      if(this.state.completedArray.length === 0) {
        console.log("no favourites");
        return <div>No Quests Completed</div>
      }

      // if completed quests list is not empty

      // iterate through every quest in completedArray and create a JSX list for the quest
      for (let i = 0; i < this.state.completedArray.length; i++) {
        console.log(i +"completed length " + this.state.completedArray.length);
        if (this.state.completedArray[i] != undefined) {

          let questName = JSON.stringify(this.state.questList[this.state.completedArray[i].questID].name);
          questName = questName.substring(1, questName.length -1);

          let questDescription = JSON.stringify(this.state.questList[this.state.completedArray[i].questID].description);
          questDescription = questDescription.substring(1, questDescription.length -1);

          // let questImageLink = JSON.stringify(this.state.questList[this.state.list[i].questID].imgLink);
          // questImageLink = questImageLink.substring(1, questImageLink.length -1);

          console.log(this.state.completedArray);
          let completedDate = JSON.stringify(this.state.completedArray[i].completedDate);
          completedDate = completedDate.substring(1, completedDate.length -1);

          completedList.push(
            <div className = "completedContainer">
              <div className = "completedTop">
                <div className = "questName">{questName}</div>
                <div className = "completedDate">
                  Completed On: {completedDate}
                </div>
              </div>
              <div className = "completedBottom">
              <div className = "questDescription">
                {questDescription}
              </div>
              <div className = "completedButtons">
                <button className="clear" value = {this.state.completedArray[i].questID} onClick={this.clearQuest.bind(this)
                  }>Clear
                </button>
                <img src="../../red_x.png" />
        
              </div>

              </div>
 
            </div>
          
          )
        }
      }
      return completedList;

      
    }


    render() {
        let content;
        if (!this.state.loading) {

          console.log("rendering");
          content = <div><div className = "favourites">Favourited Quests {this.createList()} </div> <div className = "completed">Completed Quests {this.createCompletedList()}</div></div>
        } else {
          content = 
          <div>
          </div>;
        }
        return <div>{content}</div>;
    }
}


export default Favourites;

