import React, {Component} from 'react';
import {FaTwitter, FaFacebook, FaPinterest, FaLinkedin} from 'react-icons/fa';

import { ShareButtonCircle, ShareBlockStandard} from 'react-custom-share';

/** This is the component that gives multiple buttons for users to share the activity
 * with their friends with.
 */
class ShareComp extends Component {
    constructor(props){
      super(props);
      this.state = {
        url: 'https://pickr-dev.firebaseapp.com/',
        button: ShareButtonCircle,
        //Sets the icon and the url where the button will lead to.
       buttons: [
        { network: 'Twitter', icon: FaTwitter },
        { network: 'Facebook', icon: FaFacebook },
        { network: 'Pinterest', icon: FaPinterest, media: 'https://mywebsite.com/image-to-share.jpg' },
        { network: 'Linkedin', icon: FaLinkedin },
      ],
      // Text that will be displayed when the user shares a quest.
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

