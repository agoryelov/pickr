import React, {Component} from 'react';
import {FaTwitter, FaFacebook, FaPinterest, FaLinkedin} from 'react-icons/fa';
import { css } from 'emotion';

import { ShareButtonCircle, ShareBlockStandard} from 'react-custom-share';


  // create object with props for shareBlock

class ShareComp extends Component {
    constructor(props){
      super(props);
      this.state = {
        url: 'https://pickr-dev.firebaseapp.com/',
        button: ShareButtonCircle,
       buttons: [
        { network: 'Twitter', icon: FaTwitter },
        { network: 'Facebook', icon: FaFacebook },
        { network: 'Pinterest', icon: FaPinterest, media: 'https://mywebsite.com/image-to-share.jpg' },
        { network: 'Linkedin', icon: FaLinkedin },
      ],
      text: `Pick a new adventure with - Pickr! `,
      longtext: `Come ${props.questName} with me!
      
      For more info, click here: ${props.questLink}
      `,
      }
    }

       render() {
        return (
          <div>
          <ShareBlockStandard {...this.state} />
          </div>
        );
    }
}

export default ShareComp;

