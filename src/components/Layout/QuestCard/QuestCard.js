import React from "react";

import QuestCardSummary from './CardSummary';
import QuestCardDetails from './CardDetails';

import '../../CSS/QuestPage.css'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { CSSTransition } from 'react-transition-group';

class QuestCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            distance: 0,
        };
    }

    componentDidMount() {
        //Check that props data actually came in
        if (this.props.coords != null && this.props.questData['coordinates'] != null) {

            //Grab location data from passed props
            const userLat = this.props.coords.latitude;
            const userLong = this.props.coords.longitude;
            const questLat = this.props.questData['coordinates']['lat'];
            const questLong = this.props.questData['coordinates']['long'];

            //Calculate distance based on the Haversine Formula
            const distance = this.getDistanceFromLatLonInKm(userLat, userLong, questLat, questLong);

            //Update Card state too have distance
            this.setState({ distance });
        }
    }

    getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        let R = 6371; // Radius of the earth in km
        let dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
        let dLon = this.deg2rad(lon2 - lon1);
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km
        return d;
    }

    deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    }

    handleCollapse = (event, expanded) => {
        this.setState({ expanded });
    }

    render() {
        const questData = this.props.questData;
        const distance = Math.ceil(this.state.distance) + " km";
        

        if (this.state.expanded && this.props.questId != (this.props.current)) {
            this.setState({ expanded: false });
        }
        const expanded = this.state.expanded;
        return (
            <div>
                <CSSTransition in={expanded} timeout={400} classNames="cardAnimation">
                    <div className="cardAnimationDefault">
                        <ExpansionPanel elevation={0} expanded={expanded} onChange={this.handleCollapse}>
                            <ExpansionPanelSummary classes={{ content: "noMargin", root: 'noMargin' }} >
                                <QuestCardSummary expanded={expanded} distance={distance} data={questData} questId={this.props.databaseQuestId} globalUser={this.props.globalUser}/>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{background: '#f4f4f4'}}>
                                <QuestCardDetails data={questData} />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                </CSSTransition>
            </div>
        );
    }
}

export default QuestCard;