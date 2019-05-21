import React from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import WalkIcon from '@material-ui/icons/DirectionsWalk'
import BikeIcon from '@material-ui/icons/DirectionsBike';
import TransitIcon from '@material-ui/icons/DirectionsTransit';
import { Divider } from "@material-ui/core";
class GetDirections extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            walkingDistance: null,
            transitDistance: null,
            bikingDistance: null,
            apiCalled: false,
            loading: true,


        }
        this.showTravelTimes = this.showTravelTimes.bind(this);
    }
    showTravelTimes = () => {
        console.log("Works");
        this.setState({open: true});

    } 
    render() {
        
    
        
        
        if (this.state.open && this.props.expanded){
            const directionsService = new window.google.maps.DirectionsService();
            if (this.props.coords != null) {
                if(this.state.loading){
                                //Create request header using navigator position for google maps object
                    const requestWalk = {
                        origin: this.props.coords.latitude + ", " + this.props.coords.longitude,
                        destination: this.props.questData['address'],
                        travelMode: 'WALKING',
                        unitSystem: window.google.maps.UnitSystem.METRIC
                    };

                    const requestBike = {
                        origin: this.props.coords.latitude + ", " + this.props.coords.longitude,
                        destination: this.props.questData['address'],
                        travelMode: 'BICYCLING',
                        unitSystem: window.google.maps.UnitSystem.METRIC
                    };

                    const requestTransit = {
                        origin: this.props.coords.latitude + ", " + this.props.coords.longitude,
                        destination: this.props.questData['address'],
                        travelMode: 'TRANSIT',
                        unitSystem: window.google.maps.UnitSystem.METRIC
                    };

                    //Call route method to get distance to destination specified in the request header
                    if(!this.state.apiCalled){
                        directionsService.route(requestWalk, (result, status) => {
                            if (status == window.google.maps.DirectionsStatus.OK) {
                                this.setState({
                                    walkingDistance: result.routes[0].legs[0].duration.text,
                                });
                                console.log(result);
                            }
                        });

                        directionsService.route(requestBike, (result, status) => {
                            if (status == window.google.maps.DirectionsStatus.OK) {
                                this.setState({
                                    bikingDistance: result.routes[0].legs[0].duration.text,
                                });
                                console.log(result);
                            } else {
                                console.log(status);
                            }
                        });

                        directionsService.route(requestTransit, (result, status) => {
                            if (status == window.google.maps.DirectionsStatus.OK) {
                                this.setState({
                                    transitDistance: result.routes[0].legs[0].duration.text,
                                    loading: false,
                                });
                            }
                        });
                        console.log(this.props.questData);
                        this.setState({apiCalled: true});
                    }
                }
            }
            if(!this.state.loading){
                return(
                    <div>
                        <Divider />
                        <div className = "row" style={{marginTop: '1.5em'}}>
                            <div id = "walkTime" className = "col-4 text-center"><WalkIcon />{this.state.walkingDistance}</div>
                            <div id = "bikeTime" className = "col-4 text-center"><BikeIcon />{this.state.bikingDistance}</div>
                            <div id = "transitTime" className = "col-4 text-center"><TransitIcon />{this.state.transitDistance}</div>
                        </div>
                    </div>
                )
            }
        }
        if(!this.state.open){        
            return (
                <div>
                    <Button size="small" color="primary" onClick={this.showTravelTimes}>
                    Get Directions
                    </Button>
                </div>
            )
        }
        return(<LinearProgress color="primary" variant="query" />)
    }
}

export default GetDirections;