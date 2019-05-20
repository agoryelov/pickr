import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'; 
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../CSS/About.css";
import { Carousel } from 'react-responsive-carousel';
import Collapsible from 'react-collapsible';
import Button from '@material-ui/core/Button';

import Banner from '../images/perGrowth1.jpeg';
import Selfie1 from '../images/selfie1.jpeg';
import Selfie3 from '../images/selfie3.jpeg';
import Selfie4 from '../images/selfie4.jpeg';

import ProfPic1 from '../images/profPic1.jpg';
import ProfPic2 from '../images/profPic2.png';
import ProfPic3 from '../images/profPic3.png';
import ProfPic4 from '../images/profPic4.jpg';

import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

const cardStyle = {border:'none', backgroundColor: '#63B8FF', color: 'white', boxShadow:'0px 0px 4px black', textAlign: 'center', marginBottom: '20px'};
const imgStyle = {width: '75px', margin: '0 auto', marginTop: '10px', marginBottom: '10px'};
const margBot = {marginBottom: '20px'};
const quoteStyle = {fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', marginTop: '10px', paddingRight: "15px"};
const rowStyle = {marginTop: '20px', textAlign: 'center'};
const carouselStyle = {width:'75%', marginBottom: '40px'};
let secretButton = <Button component={Link} to={ROUTES.SWEEP} color="inherit">Don't click</Button>;
const bodPadding = {paddingLeft: '30px', paddingRight: '30px'};
const cardFont = {color: 'white', textShadow: '0px 0px 4px black'};

const statement = (
  <div  className = "col-sm-12">
  <h2 style ={cardFont}>Our Mission</h2>
  <p id = "userStory" style ={cardFont}>
    Pickr began with a common experience that we all have had: boredom. Whether it's the boredom of having the same routine everyday or the boredom
    of not knowing what there is to explore, we have all felt that there needs to be a change. For myself, I know that I have a habit of repeating the same
    activities especially when I am busy with school or work, and it can actually be energy draining to be stuck in a rut. As a result, I thought it would be
    great if there was an application that could push me to try new things where I live, and as a result Pickr was created.
  </p>
  <p id ="missStatement" style ={cardFont}>At Pickr, our aim is to encourage others to try new activities that will help them on their journey of
   personal growth. Our application makes stepping out of your comfort zone easy by suggesting interesting activities near you. Finding 
   something to do is as simple as a swipe of your screen with Pickr.
  </p>

  </div>
);

class MissState extends Component {
    constructor(props){
        super(props);
    }

    render() {
      return(
        <div className ="container-fluid" style = {bodPadding}>
          <div className="card" style = {rowStyle}>
          <img id = "missCard" src = {Banner} alt = "banner" style = {{width: '100%', filter: 'contrast(60%)'}} className = "card-img"/>
          <div className = "card-img-overlay">
          {statement}  
          </div>
           </div>   
        <br/>
        <div className = "row justify-content-center" style ={rowStyle}>
        <div className = "col-sm-12" style = {margBot}>
            <h2>Our Team</h2>
        </div>
        <br/>
  
          <div className = "col-sm-6">
          <div className = "card" style = {cardStyle}>
                <img className = "rounded-circle" src = {ProfPic1} style = {imgStyle}/>
                <Collapsible trigger = "Andrey G."
                   transitionTime = {300}
                   triggerStyle ={{cursor: 'pointer'}}
                   >
                     <br/><p></p></Collapsible>
              </div>
           </div>
           <div className = "col-sm-6">
              <div className = "card" style = {cardStyle}>
                <img className = "rounded-circle" src = {ProfPic2} style = {imgStyle}/>
                <Collapsible trigger = "Noah M."
                   transitionTime = {300}
                   triggerStyle ={{cursor: 'pointer'}}
                   >
                     <br/><p></p></Collapsible>
              </div>
           </div>
          
           <div className = "col-sm-6">
              <div className = "card" style = {cardStyle}>
                <img className = "rounded-circle" src = {ProfPic3} style = {imgStyle}/>
                <Collapsible trigger = "Steven H."
                   transitionTime = {300}
                   triggerStyle ={{cursor: 'pointer'}}
                   >
                     <br/><p></p></Collapsible>
              </div>
           </div>
           <div className = "col-sm-6">
              <div className = "card" style = {cardStyle}>
                <div className = "card-header">
                  <img className = "rounded-circle" src = {ProfPic4} style = {imgStyle}/>
                   <Collapsible trigger = "Young K."
                   transitionTime = {300}
                   triggerStyle ={{cursor: 'pointer'}}
                   >
                     <br/><p>Young is currently a CST student at BCIT who has finished his 
                   first term of the program. He has an undergraduate degree in mechanical engineering and has an active 
                   passion for web development, renewable energy, and machine learning.</p></Collapsible>
                </div>
              </div>
           </div>
        </div>
        <br/>
        <blockquote className = "blockquote" style ={quoteStyle}>
      <p className = "mb-0">"The price of doing the same old thing is far higher than the price of change." </p>
      <footer className = "blockquote-footer">BILL CLINTON</footer>
    </blockquote>
        <div className = "container-fluid" style = {carouselStyle}>
        <Carousel
         infiniteLoop = {true}
         interval = {2500}
         swipeable = {true}
         autoPlay = {true}
         showThumbs = {false}
         showIndicators = {false}
         showStatus = {false}
         stopOnHover = {true}
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
        </div>
      )
    }
}

  export default MissState;