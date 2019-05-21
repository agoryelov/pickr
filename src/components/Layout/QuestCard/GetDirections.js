import React from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
class GetDirections extends React.Component {
    
    render() {

        //console.log(this.props.coords);
        return (
            <div>
                <Button size="small" color="primary">
                    Get Directions
                </Button>
            </div>
        )
    }
}

export default GetDirections;