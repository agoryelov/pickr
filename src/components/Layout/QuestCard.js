import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DirectionsTransitIcon from '@material-ui/icons/DirectionsTransit';

import '../Pages/QuestPage.css'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

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

    getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
    deg2rad = (deg) => {
        return deg * (Math.PI/180);
    }

    handleChange = (event, expanded) => {
        this.setState({expanded});
    }
    
    render() {
        const questName = this.props.questData['name'];
        const questLocation = this.props.questData['location'];
        const questImage = this.props.questData['imgLink'];
        const questAbout = this.props.questData['description'];
        const distance = Math.ceil(this.state.distance) + " km";

        if (this.state.expanded && this.props.questId != (this.props.current)) {
            this.setState({expanded: false});
        }

        let expanded = this.state.expanded;

        let contentBig = 
                <Grid container direction="column" alignItems="center" style={{
                    backgroundImage: `url('${questImage}')`,
                    backgroundPosition: 'center',
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'no-repeat',
                    height: '400px',
                    width: '100%' }}>
                    <div style={{width: "100%", height: "85%"}}></div>
                    <div style={{background: 'rgba(0, 0, 0, 0.5)', color: 'white', width: "100%", height: "15%"}}>
                        <Grid container alignItems="center" style={{height: '100%', textAlign: 'left'}}>
                            <Grid item xs={9} style={{paddingLeft: '12px'}}>
                                {questName}
                            </Grid>
                            <Grid item xs={3} style={{paddingLeft: '12px', textAlign: 'center'}}>
                                {distance}
                            </Grid>
                            <Grid item xs={12} style={{paddingLeft: '12px', fontSize: '.8em'}}>
                                {questLocation}
                            </Grid>
                        </Grid>
                    </div>
                </Grid>;
            
        let contentSmall = 
                <Grid container justify="center" style={{
                    backgroundImage: `url('${questImage}')`, 
                    backgroundPosition: 'center',
                    backgroundSize: '100% auto',
                    height: '250px',
                    width: '100%' }}>
                    <div style={{width: "100%", height: "80%"}}></div>
                    <div style={{background: 'rgba(0, 0, 0, 0.5)', color: 'white', width: "100%", height: "20%"}}>
                        <Grid container alignItems="center" style={{height: '100%', textAlign: 'left'}}>
                                <Grid item xs={8} style={{paddingLeft: '12px'}}>
                                    {questName}
                                </Grid>
                                <Grid item xs={4} style={{paddingLeft: '12px', textAlign: 'center'}}>
                                    {distance}
                                </Grid>
                                <Grid item xs={12} style={{paddingLeft: '12px', fontSize: '.8em'}}>
                                    {questLocation}
                                </Grid>
                        </Grid>
                    </div>
                </Grid>;
        return(
            <div>
                <ExpansionPanel expanded={expanded} 
                onChange={this.handleChange} 
                style={{margin: '0', padding: '0'}}>
                    <ExpansionPanelSummary classes={{content: "noMargin", root: 'noMargin'}} >
                        <Grid container style={{padding: '0'}}>
                            <Grid item xs={12}>
                                {expanded ? contentSmall : contentBig}
                            </Grid>
                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={8}>
                            <Grid item xs={4}>
                                Location
                            </Grid>
                            <Grid item xs={4}>
                                Price
                            </Grid>
                            <Grid item xs={4}>
                                Eco
                            </Grid>
                            <Grid item xs={4} style={{fontWeight: "500"}}>
                                Details
                            </Grid>
                            <Grid item xs={12} style={{fontSize: ".8em", textAlign: 'justify'}}>
                                {questAbout}
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default QuestCard;