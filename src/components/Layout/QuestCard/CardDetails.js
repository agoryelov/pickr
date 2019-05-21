import React from "react";
import Grid from '@material-ui/core/Grid';

import GetDirections from './GetDirections';
class QuestCardDetails extends React.Component {
    
    render() {
        //Get quest information from parent
        const data = this.props.data;
        //Pull relevant card summary data
        const questLocation = data['location'];
        const questCost = data['cost'];
        const questEcoRating = data['ecoRating'];
        const questAbout = data['description'];


        return (
            <Grid container spacing={8}>
                <Grid item xs={6}>
                    {questLocation}
                </Grid>
                <Grid item xs={3}>
                    &#128176; {questCost} / 3
                </Grid>
                <Grid item xs={3}>
                    &#127758; {questEcoRating} / 3
                </Grid>
                <Grid item xs={4} style={{ fontWeight: "500" }}>
                    Details
                </Grid>
                <Grid item xs={12} style={{ fontSize: ".8em", textAlign: 'justify' }}>
                    {questAbout}
                </Grid>
                <Grid item xs={12} style={{ fontSize: ".8em", textAlign: 'justify' }}>
                    <GetDirections coords={this.props.coords} />
                </Grid>
            </Grid>
        )
    }
}

export default QuestCardDetails;