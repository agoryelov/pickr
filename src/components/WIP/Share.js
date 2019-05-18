import React, {Component} from 'react';
import {FaTwitter, FaFacebook, FaPinterest, FaLinkedin} from 'react-icons/fa';
import { css } from 'emotion';

import { ShareButtonCircle, ShareBlockStandard} from 'react-custom-share';

const responseFacebook = (response) => {
  console.log(response);
}

const ShareComponent = props => {
  // create object with props for shareBlock
  const shareBlockProps = {
    url: 'https://pickr-dev.firebaseapp.com/',
    button: ShareButtonCircle,
    buttons: [
      { network: 'Twitter', icon: FaTwitter },
      { network: 'Facebook', icon: FaFacebook },
      { network: 'Pinterest', icon: FaPinterest, media: 'https://mywebsite.com/image-to-share.jpg' },
      { network: 'Linkedin', icon: FaLinkedin },
    ],
    text: `Pick a new adventure with - Pickr! `,
    longtext: `Join me on this quest through Pickr.`,
  };

  return <ShareBlockStandard {...shareBlockProps} />;
};

class ShareComp extends Component {
       render() {
        return (
          <div>
          <ShareComponent/>
          </div>
        );
    }
}

export default ShareComp;