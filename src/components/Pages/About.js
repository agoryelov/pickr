import React from "react";
import MissState from '../Layout/cards/MissState';
import Sorter from '../Layout/cards/Sorter';

var randomarr = [2, 6, 5, 1, 9, 8, 10, 11, 4, 3, 7];
var prox = 6;

const About = () => (
  <div>
    <MissState />
    <Sorter arr = {randomarr} prox = {prox}/>
  </div>
);

export default About;