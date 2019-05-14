import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../WIP/home.css';
import {withGoogleMap, GoogleMap, DirectionsRenderer} from 'react-google-maps';

const DirectionsService = new google.maps.DirectionsService();

class CalcJourney extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userOrigin: props.userOrigin,
            questAdd: props.questAdd,
            requestWalk: null,
            requestBike: null,
            requestTransit: null,
        };
    }

    calcRoute = () => {
            DirectionsService.route( {
                origin: this.state.userOrigin,
                destination: this.state.questAdd,
                travelMode: google.maps.TravelMode.WALKING, 
                unitSystem: GoogleMap.UnitSystem.METRIC}, (res, status) => {
                if(status == GoogleMap.DirectionsStatus.OK) {
                    document.getElementById("walkTime").innerHTML = res.routes[0].legs[0].duration.text;
                }
            });
            DirectionsService.route(   { 
                origin: this.state.userOrigin,
                destination: this.state.questAdd,
                travelMode: GoogleMap.TravelMode.BICYCLING, 
                unitSystem: GoogleMap.UnitSystem.METRIC}, (res, status) => {
                if(status == GoogleMap.DirectionsStatus.OK) {
                    document.getElementById("bikeTime").innerHTML = res.routes[0].legs[0].duration.text;
                }
            });
            /**DirectionsService.route(this.state.requestTransit, (res, status) => {
                if(status == GoogleMap.DirectionsStatus.OK) {
                    document.getElementById("bikeTime").innerHTML = res.routes[0].legs[0].duration.text;
                }
            });*/
    }

    callRoute = () => {
        this.calcRoute(this.state.userOrigin, this.state.questAdd);
    }

    render() {
        this.callRoute();
        return (
            <div className = "row">
                <div id = "walkTime" className = "col-4 text-center"></div>
                <div id = "bikeTime" className = "col-4 text-center"></div>
                <div id = "transitTime" className = "col-4 text-center"></div>
            </div>
        )
    }

}

export default CalcJourney;