import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'; 
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../../css/About.css";
import { Carousel } from 'react-responsive-carousel';
import Collapsible from 'react-collapsible';
import Button from '@material-ui/core/Button';

// Imports images
import Banner from '../../../img/perGrowth1.jpeg';
import Selfie1 from '../../../img/selfie1.jpeg';
import Selfie3 from '../../../img/selfie3.jpeg';
import Selfie4 from '../../../img/selfie4.jpeg';

import ProfPic1 from '../../../img/profPic1.jpg';
import ProfPic2 from '../../../img/profPic2.png';
import ProfPic3 from '../../../img/profPic3.png';
import ProfPic4 from '../../../img/profPic4.jpg';

import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

// Style constants (needed to change bootstrap attributes)
const cardStyle = {border:'none', backgroundColor: '#63B8FF', color: 'white', boxShadow:'0px 0px 4px black', textAlign: 'center', marginBottom: '20px'};
const imgStyle = {width: '75px', margin: '0 auto', marginTop: '10px', marginBottom: '10px'};
const margBot = {marginBottom: '20px'};
const quoteStyle = {fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', marginTop: '10px', paddingRight: "15px"};
const rowStyle = {marginTop: '20px', textAlign: 'center'};
const carouselStyle = {width:'75%', marginBottom: '40px'};
let secretButton = <Button component={Link} to={ROUTES.SWEEP} color="inherit">Don't click</Button>;
const bodPadding = {paddingLeft: '30px', paddingRight: '30px'};
const cardFont = {color: 'white', textShadow: '0px 0px 4px black'};

// Mission statement div
const statement = (
  <div  className = "col-sm-12">
    <h2 style ={cardFont}>Our Mission</h2>
    <p id = "userStory" style ={cardFont}>
      Pickr began with a common experience that we all have had: boredom. Whether it's the boredom of having the same routine everyday or the boredom
      of not knowing what there is to explore, we have all felt that there needs to be a change in our lives. For myself, I know that I have a habit of repeating the same
      activities especially when I am busy with school or work, and it can actually be energy draining to be stuck in a rut. As a result, I thought it would be
      great if there was an application that could push me to try new things where I live, and as a result Pickr was created.
    </p>
    <p id ="missStatement" style ={cardFont}>At Pickr, our aim is to encourage others to try new activities that will help them on their journey of
      personal growth. Our application makes stepping out of your comfort zone easy by suggesting interesting activities near you. Finding 
      something to do is as simple as a swipe of your screen with Pickr.
    </p>
  </div>
);

/** This component renders the mission statement, bios/profile pictures of each team member
 * and is the location of our Easter Egg.
 */
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
                <div className = "card-header">
                  <img className = "rounded-circle" src = {ProfPic1} style = {imgStyle}/>
                    <Collapsible trigger = "Andrey G."
                     transitionTime = {300}
                     triggerStyle ={{cursor: 'pointer'}}
                    >
                     <br/><p>Andrey has been passionate about programming since an early age and entered
                      the CST program to get hands on software development experience and jumpstart his career. 
                      He likes UX design, programming, puzzles, and llamas.</p></Collapsible>
                </div>
              </div>
            </div>

            <div className = "col-sm-6">
              <div className = "card" style = {cardStyle}>
                <div className = "card-header">
                  <img className = "rounded-circle" src = {ProfPic2} style = {imgStyle}/>
                  <Collapsible trigger = "Noah M."
                   transitionTime = {300}
                   triggerStyle ={{cursor: 'pointer'}}
                   >
                    <br/>
                    <p>Noah is currently a CST student at BCIT. He has always had a curiosity to learn more 
                      about programming and computer science. His major interests are in web development, gaming, and machine learning.</p></Collapsible>
                </div>
              </div>
           </div>
          
            <div className = "col-sm-6">
              <div className = "card" style = {cardStyle}>
                <div className = "card-header">
                  <img className = "rounded-circle" src = {ProfPic3} style = {imgStyle}/>
                  <Collapsible trigger = "Steven H."
                   transitionTime = {300}
                   triggerStyle ={{cursor: 'pointer'}}
                   > 
                    <br/><p>Steven is an aspiring software developer and a current CST student at BCIT.
                       Steven was interested in programming from an early age and had taught himself programming as a hobby. 
                       Before coming to BCIT, Steven worked as an accountant and has a BBA in Finance.</p></Collapsible>
                </div>
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