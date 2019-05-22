import React from "react";
import ShareComp from '../WIP/Share';
import {FacebookShareButton, WhatsappShareButton, LinkedinShareButton} from 'react-share';
import {FacebookIcon, WhatsappIcon} from 'react-share';

const Landing = () => (
  <div>
    <h1>Landing</h1>
    <h4>Please Login</h4>
    <div>
    <FacebookShareButton 
      url = {"localhost:3000"}
      title = "Pickr"
      className = "shareBtn col-md-1 col-sm-1 col-xs-1"
    ><a className="facebook"><i className="fa fa-facebook" aria-hidden="true"></i></a></FacebookShareButton>
    <WhatsappShareButton
    url = {"localhost:3000"}
    children = {<WhatsappIcon size = {40} borderRadius ={5}/>}/>
    </div>
    <ShareComp/>
  </div>
);

export default Landing;