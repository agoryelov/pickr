import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import dollarIcon from '../../Layout/images/dollar.png'; 
import '../../WIP/home.css';

const cardFont = "color: white; textShadow: 0px 0px 4px black;";

function Costs (props) {
    if(props.loaded === 1) {
      var costDiv = document.getElementById("Costbox");
      var filler = document.createElement("div");
      costDiv.appendChild(filler);
      while(costDiv.firstChild) {
        costDiv.removeChild(costDiv.firstChild)
      }
      var costHead = document.createElement("h5");
      costHead.className = "card-title";
      costHead.setAttribute("style", cardFont);
      costHead.innerHTML = "Cost";
      costDiv.appendChild(costHead);
      var dollar;
      for(let i = 0; i < props.questCost; i++) {
        dollar = document.createElement("img");
        dollar.src = dollarIcon;
        dollar.alt = "star";
        dollar.className = "stars";
        costDiv.appendChild(dollar);
      }
    } 

    return(
      <div className = "cost-title" id = "Costbox"> </div>
    )
}

export default Costs;