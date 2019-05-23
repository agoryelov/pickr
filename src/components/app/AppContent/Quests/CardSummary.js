import React from "react";

import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';

import '../../../css/QuestPage.css'
import FavoriteIcon from '@material-ui/icons/Favorite';

import { CSSTransition } from 'react-transition-group';

import Firebase from '../../../firebase.js'

/**
 * The header of the quest card that lets you save it to your favourites
 */
class QuestCardSummary extends React.Component {
    //If firebase is still retreiving the user data it will display a loading circle
    firebase = new Firebase();

    //Saving the quest to the user profile
    handleSave = (e) => {
        e.stopPropagation();
        this.props.toggleSnackbar();
        // the time the user saved the quest
        let now = new Date().toString(' MMMM d yyyy');

        // the current user
        const uid = this.props.globalUser.uid;
        
        // add the quest to the user's favourite quest list in firebase
        /*
        this.firebase.favourites(uid).child(this.props.questId).update({
            questID : this.props.questId,
            savedDate : now,
        });*/
    }

    render() {
        //Get state of the card from parent
        const expanded = this.props.expanded;

        //Get quest information from parent
        const data = this.props.data;
        const distance = this.props.distance;

        //Pull relevant card summary data
        const questName = data['name'];
        const questImage = data['imgLink'];
       
        return (
            <Grid container style={{ padding: '0' }}>
                <Grid item xs={12}>
                    <Grid container className={expanded ? "cardBgOpened" : "cardBgClosed"} direction="column" alignItems="center" style={{
                        backgroundImage: `url('${questImage}')`,
                        backgroundPosition: 'center',
                        backgroundSize: '100% auto',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: '15px 15px 0 0'
                    }}>
                        <div className={expanded ? "cardTopOpened" : "cardTopClosed"}>
                            <CSSTransition in={expanded} timeout={500} classNames="saveButtonAnimation">
                                <div className="saveButtonAnimationDefault heartBeat">
                                    <Fab style={{ backgroundColor: 'white' }} size="medium" onClick={this.handleSave}>
                                        <FavoriteIcon color="secondary" />
                                    </Fab>
                                </div>
                            </CSSTransition>
                        </div>
                        <div style={{borderRadius: '0 0 15px 15px'}} className={expanded ? "cardOpened" : "cardClosed"}>
                            <Grid container alignItems="center" style={{ height: '100%', textAlign: 'left' }}>
                                <Grid item xs={12} style={{ paddingLeft: '12px' }}>
                                    {questName}
                                </Grid>
                                <Grid item xs={12} style={{ paddingLeft: '12px', fontSize: '.8em' }}>
                                    {distance} away
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default QuestCardSummary;