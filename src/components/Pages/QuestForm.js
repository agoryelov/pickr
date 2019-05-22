import React, { cloneElement } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Firebase from '../firebase'
import '../CSS/Favourites.css';




class QuestForm extends React.Component {
    firebase = new Firebase();
    constructor(props) {
        super(props);

        this.state = {

            // List of all quests
            questList: null,

        };
    }

    componentDidMount() {

      // grab list of all quests in firebase and save to questList
      this.firebase.questsAll().once("value", snapshot => {
        console.log(snapshot.val());
        this.setState({ 
          questList: snapshot.val(),
        });
      });


    }

    createForm() {
        form = 
        <form>
            <input type = "text" name = "questAddress"></input>
            


        </form>

        return form;
    }



    render() {
        let content;
 

          console.log("rendering");
          content = <div> {this.createForm()} </div>;
          

        return <div>{content}</div>;
    }
}


export default QuestForm;
