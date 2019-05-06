
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);                    
} else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
}
var userOrigin;
var access = false;
function showPosition(position) {
    userOrigin = position.coords.latitude + ", " + position.coords.longitude;
    access = true;
    console.log(userOrigin);
    firstQuest();
}

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();
function callRoute(questAddress) {
    calcRoute(userOrigin, questAddress);
}
//define calcRoute function
function calcRoute(userOrigin, questAddress) {
    if (access) {
        //creates requests
        var requestWalk = {
            origin: userOrigin,
            destination: questAddress,
            travelMode: google.maps.TravelMode.WALKING, 
            unitSystem: google.maps.UnitSystem.METRIC
        }
        var requestBike = {
            origin: userOrigin,
            destination: questAddress,
            travelMode: google.maps.TravelMode.BICYCLING,
            unitSystem: google.maps.UnitSystem.METRIC
        }

        var requestTransit = {
            origin: userOrigin,
            destination: questAddress,
            travelMode: google.maps.TravelMode.TRANSIT,
            unitSystem: google.maps.UnitSystem.METRIC
        }

        //passing the requests to the route methods
        directionsService.route(requestWalk, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                $("#distance").html(result.routes[0].legs[0].distance.text);
                $("#walk").html("Walk Time " + result.routes[0].legs[0].duration.text);
            } else {
                console.log("Journey time request failed");
                $("#walk").html("Could not calculate distance");
            }
        });
        directionsService.route(requestBike, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                $("#bike").html("Bike Time " + result.routes[0].legs[0].duration.text);
            } else {
                console.log("Journey time request failed");
                $("#bike").html("Could not calculate distance");
            }
        });
        directionsService.route(requestTransit, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                $("#transit").html("Transit Time: " + result.routes[0].legs[0].duration.text);
            } else {
                console.log("Journey time request failed");
                $("#transit").html("Could not calculate distance");
            }
        });
    } else{
        console.log("Permission was not granted");
    }
}


            