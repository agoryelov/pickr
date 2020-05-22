import React from "react";
import Grid from '@material-ui/core/Grid';

import GetDirections from './GetDirections';

/**
 * Renders quest details from the Quest Card component
 */
class QuestCardDetails extends React.Component {
    
    render() {
        //Get quest information from parent
        const data = this.props.data;

        //Pull relevant card summary data
        const questLocation = data['location'];
        const questAbout = data['description'];

        return (
            <Grid container spacing={8}>
                <Grid item xs={6}>
                    {questLocation}
                </Grid>
                <Grid item xs={12} style={{ fontSize: ".8em", textAlign: 'justify' }}>
                    {questAbout}
                </Grid>
                <Grid item xs={12} style={{ fontSize: ".8em", textAlign: 'justify' }}>
                    <GetDirections coords={this.props.coords} expanded={this.props.expanded} questData={data}/>
                </Grid>
            </Grid>
        )
    }
}

export default QuestCardDetails;