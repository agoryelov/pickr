import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'; 
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Button from '@material-ui/core/Button';

import ProfPic from '../images/profPic.png';
import Selfie1 from '../images/selfie1.jpeg';
import Selfie3 from '../images/selfie3.jpeg';
import Selfie4 from '../images/selfie4.jpeg';

import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

const cardStyle = {border:'none', backgroundColor: '#63B8FF', color: 'white', boxShadow:'0px 0px 4px black', textAlign: 'center', marginBottom: '20px'};
const imgStyle = {width: '20%', margin: '0 auto'};
const margBot = {marginBottom: '20px'};
const margTop = {marginTop: '20px'};
const carouselStyle = {width:'300px'};
let secretButton = <Button component={Link} to={ROUTES.SWEEP} color="inherit">Don't click</Button>;


class MissState extends Component {
    constructor(props){
        super(props);
    }

    render() {
      return(
        <div className ="container-fluid">
        <div className = "row">
            <div className = "col-sm-12" style ={{paddingTop: "20px"}}>
                <h2 style ={{textAlign: 'center'}}>Our Mission</h2>
                <p style ={{textAlign: 'left'}}>At Pickr, our aim is to encourage others to try new activities that will help them on their journey of
                 personal growth. Our application makes stepping out of your comfort zone easy by suggesting interesting activities near you. Finding 
                 something to do is as simple as a swipe of your screen with Pickr.
                </p>
            </div>
        </div>
        <br/>
        <div className = "container-fluid">
        <Carousel
         infiniteLoop = {true}
         intervale = "1500"
         swipeable = {true}
         autoPlay = {true}
         showThumbs = {false}
         showIndicators = {false}
         showStatus = {false}
        >
          <div>
            <img src = {Selfie1} alt ="self1"/>
          </div>
          <div>
            <img src = {Selfie3} alt ="self3"/>
            <p className ="legend">{secretButton}</p>
          </div>
        <div>
            <img src = {Selfie4} alt ="self4"/>
          </div>
        </Carousel>
        </div>
        <br/>
        <div className = "row" style ={margTop}>
        <div className = "col-sm-12" style = {margBot}>
            <h3 style = {{textAlign: 'center'}}>Our Team</h3>
        </div>
        <br/>
          <div className = "col-sm-3">
          <div className = "card" style = {cardStyle}>
                <img className = "img-circle" src = {ProfPic} style = {imgStyle}/>
                <h6 className = "Name">Andrey G</h6>
              </div>
           </div>
           <div className = "col-sm-3">
              <div className = "card" style = {cardStyle}>
                <img className = "img-circle" src = {ProfPic} style = {imgStyle}/>
                <h6 className = "Name">Noah MacRitchie</h6>
              </div>
           </div>
          
           <div className = "col-sm-3">
              <div className = "card" style = {cardStyle}>
                <img className = "img-circle" src = {ProfPic} style = {imgStyle}/>
                <h6 className = "Name">Steven Hwang</h6>
              </div>
           </div>
           <div className = "col-sm-3">
              <div className = "card" style = {cardStyle}>
                <img className = "img-circle" src = {ProfPic} style = {imgStyle}/>
                <h6 className = "Name">Young Kwon</h6>
              </div>
           </div>
        </div>
        </div>
      )
    }
   
}

  export default MissState;