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

            // Boolean set to true until user is logged in and list updated
            loading: true,
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
          this.firebase.favourites(user.uid).once("value", snapshot => {
            console.log(snapshot.val());
            this.setState({ 
              list: snapshot.val(),
              loading: false,

            });
            console.log("if user list:" + this.state.list);
          });
          console.log("list:" + this.state.list);
        } else {
          this.props.history.push(ROUTES.SIGN_IN);
        }
      });
    }

    createList = () => {
      let favouriteList = []

      for (var i = 0; i < this.state.list.length; i++) {
        console.log(i);
        if (this.state.list[i] != undefined) {

          let questName = JSON.stringify(this.state.questList[this.state.list[i].questID].name);
          questName = questName.substring(1, questName.length -1);

          let questDescription = JSON.stringify(this.state.questList[this.state.list[i].questID].description);
          questDescription = questDescription.substring(1, questDescription.length -1);

          // let questImageLink = JSON.stringify(this.state.questList[this.state.list[i].questID].imgLink);
          // questImageLink = questImageLink.substring(1, questImageLink.length -1);

          let savedDate = JSON.stringify(this.state.list[i].savedDate);
          savedDate = savedDate.substring(1, savedDate.length -1);

          console.log("quest" + this.state.questList[this.state.list[i].questID].name);
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
              </div>
 
            </div>
          
          
          
          
          
          )
        }
      }
      return favouriteList;
      
    }


    
    
    render() {
        let content;
        if (!this.state.loading) {

          content = <div> {this.createList()} </div>;
          
        } else {
          content = 
          <div>
          </div>;
        }
        return <div>{content}</div>;
    }
}

export default Favourites;

