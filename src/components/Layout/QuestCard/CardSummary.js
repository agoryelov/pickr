import React from "react";

import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';

import '../../CSS/QuestPage.css'
import FavoriteIcon from '@material-ui/icons/Favorite';

import { CSSTransition } from 'react-transition-group';

import Firebase from '../../firebase.js'


class QuestCardSummary extends React.Component {

    firebase = new Firebase();

    handleSave = (e) => {
        e.stopPropagation();

        let now = new Date().toString(' MMMM d yyyy');

        this.firebase.favourites(this.props.globalUser).child(this.props.questId).update({
            questID : this.props.questId,
            savedDate : now,
          });
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
                        <div className={expanded ? "cardOpened" : "cardClosed"}>
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