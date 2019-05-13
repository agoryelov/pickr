import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import starIcon from '../../Layout/images/star2.png'; 
import '../../WIP/home.css';

const cardFont = "color: white; textShadow: 0px 0px 4px black;";

function EcoRatings(props) {
  if(props.loaded === 1) {
    var starDiv = document.getElementById("ecoratings");
    var filler = document.createElement("div");
    starDiv.appendChild(filler);
    while(starDiv.firstChild) {
      starDiv.removeChild(starDiv.firstChild)
    } 
    var ecoHead = document.createElement("h5");
     ecoHead.className = "card-title";
     ecoHead.setAttribute("style", cardFont);
     ecoHead.innerHTML = "EcoRating";
     starDiv.appendChild(ecoHead);
      var star;
      for(let i = 0; i < props.questEco; i++) {
        star = document.createElement("img");
        star.src = starIcon;
        star.alt = "star";
        star.className = "stars";
        starDiv.appendChild(star);
      }
    }
    return(
        <div id = "ecoratings">
        </div>
    )
    
}

export default EcoRatings;