import React from "react";
// Material UI's utility and styling components
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import WalkIcon from '@material-ui/icons/DirectionsWalk'
import BikeIcon from '@material-ui/icons/DirectionsBike';
import TransitIcon from '@material-ui/icons/DirectionsTransit';
import { Divider } from "@material-ui/core";

/* The GetDirections class makes distance matrix requests to google to get journey times.
    Once you click the get travel times button it displays the time to walk, bike and transit
     to get to the location. */
class GetDirections extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false, //Has the get journey time button been pressed for the card
            walkingDistance: null,
            transitDistance: null,
            bikingDistance: null,
            apiCalled: false, //Flag to see if api has already been called for the card
            loading: true, 


        }
        this.showTravelTimes = this.showTravelTimes.bind(this);
    }

    showTravelTimes = () => {
        console.log("Works");
        this.setState({open: true});

    } 
    render() {
        
    
        
        //Button must be clicked and the card must be expanded to make the request
        if (this.state.open && this.props.expanded){
            //Creates a directionsService object that will be used to make the requests.
            const directionsService = new window.google.maps.DirectionsService();
            if (this.props.coords !== null) {
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
                            if (status === window.google.maps.DirectionsStatus.OK) {
                                this.setState({
                                    walkingDistance: result.routes[0].legs[0].duration.text,
                                });
                                
                            }
                        });

                        directionsService.route(requestBike, (result, status) => {
                            if (status === window.google.maps.DirectionsStatus.OK) {
                                this.setState({
                                    bikingDistance: result.routes[0].legs[0].duration.text,
                                });
                               
                            } else {
                                console.log(status);
                            }
                        });

                        directionsService.route(requestTransit, (result, status) => {
                            if (status === window.google.maps.DirectionsStatus.OK) {
                                this.setState({
                                    transitDistance: result.routes[0].legs[0].duration.text,
                                    loading: false,
                                });
                            }
                        });
                      
                        this.setState({apiCalled: true});
                    }
                }
            }
            //If all of the reponses from google have been received the repsonses are displayed
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
        //If the get travel times button has not been clicked the button is displayed
        if(!this.state.open){        
            return (
                <div>
                    <Button size="small" color="primary" onClick={this.showTravelTimes}>
                        Get Travel Times
                    </Button>
                </div>
            )
        }
        //If The bget travel times button has been clicked but not all resonses have been received a loading bar is displayed.
        return(<LinearProgress color="primary" variant="query" />)
    }
}

export default GetDirections;