import React from "react";
import Swing from 'react-swing';
import './Swing.css'

class Swiper extends React.Component {
    render() {
      return (
          <div id="viewport">
              <Swing 
              className="stack" 
              throwout={e => console.log('throwout', e)} 
              >
                  {}
                  <div className="card clubs" throwout={e => console.log('card throwout', e)}>A</div>
                  <div className="card diamonds" >B</div>
                  <div className="card hearts">C</div>
              </Swing>
          </div>
      );
    }
}

export default Swiper;