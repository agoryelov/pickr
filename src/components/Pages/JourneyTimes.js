import React from "react";

class JourneyTimes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sampleData: "test",
        };
    }
    
    componentDidMount() {
            //Get current position
            navigator.geolocation.getCurrentPosition((position) => {
                //Create google maps object after got position
                var directionsService = new window.google.maps.DirectionsService();

                //Create request header using navigator position for google maps object
                var requestWalk = {
                    origin: position.coords.latitude + ", " + position.coords.longitude,
                    destination: 'Los Angeles, CA',
                    travelMode: 'WALKING',
                    unitSystem: window.google.maps.UnitSystem.METRIC
                };

                //Call route method to get distance to destination specified in the request header
                directionsService.route(requestWalk, function (result, status) {
                    if (status == window.google.maps.DirectionsStatus.OK) {
                        console.log(result.routes[0].legs[0].distance.text);
                    }
                });
            });
    }
    
    render() {

        return(<div>Example Div</div>)
    }
}

export default JourneyTimes;