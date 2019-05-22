import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Firebase from '../firebase';
import CoinFull from './../../img/coinsFull.png';
import CoinEmpty from './../../img/coinsEmpty.png';
// Material UI's utility and styling components
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import { ListItem, ListItemIcon } from '@material-ui/core';

const styles = {
  root: {
    width: '100%',
    margin: 'auto 0',
  },

  slider: {
    padding: '22px 0px',
  },
};
//Coins sizes
const imgStyle = {
  height: 30,
  width: 30,

};

class StepSlider extends React.Component {
  // Call access to the Firebase database.
  firebase = new Firebase();

  state = {
    value: 0, //slider value
  };
  /*When the component mounts it retreves the users money search value, then 
  sets the state of the value and uses ReactDom to display the right amount
  of coins corresponding to the value. Along with the $ range*/
  componentDidMount() {
    this.firebase.auth.onAuthStateChanged((authUser) => {
      
        if (authUser) {
            this.setState({ authUser });
            this.userPreferences = this.firebase.preferences(authUser.uid);
            this.userPreferences.once("value", snapshot => {
              switch(snapshot.val().Cost) {
                case 0:
                  ReactDOM.render(<div><img src = {CoinFull} alt = "coins" style={imgStyle} />
                  <img src = {CoinEmpty} alt = "coins" style={imgStyle} />
                  <img src = {CoinEmpty} alt = "coins" style={imgStyle} />
                  </div>
                  , document.getElementById('dollarSigns'));  
                  ReactDOM.render(<span> is Under $20 </span>, document.getElementById('cost'));
                  this.setState({value : 0}); 
                  break;
                case 1:
                  ReactDOM.render(<div><img src = {CoinFull} alt = "coins" style={imgStyle} />
                  <img src = {CoinFull} alt = "coins" style={imgStyle} />
                  <img src = {CoinEmpty} alt = "coins" style={imgStyle} />
                  </div>
                  , document.getElementById('dollarSigns'));  
                  ReactDOM.render(<span> is Under $50 </span>, document.getElementById('cost'))
                  this.setState({value : 1}); 
                  break;
                default:
                  ReactDOM.render(<div><img src = {CoinFull} alt = "coins" style={imgStyle} />
                  <img src = {CoinFull} alt = "coins" style={imgStyle} />
                  <img src = {CoinFull} alt = "coins" style={imgStyle} />
                  </div>
                  , document.getElementById('dollarSigns'));   
                  ReactDOM.render(<span> is Over $50 </span>, document.getElementById('cost'));
                  this.setState({value : 2}); 
              } 

            })
            
        } else {
            this.setState({ authUser: null });
            
        }
    });
}
  /*When the slider is moved the new value will be used to figure out how many coins to display
  as well as the $ amount. The state of the value will also be updated along with the user's
  Firebase value. */
  handleChange = (event, value) => {
    this.setState({ value: value},() => {switch(this.state.value) {
      case 0:
        ReactDOM.render(<div><img src = {CoinFull} alt = "coins" style={imgStyle} />
        <img src = {CoinEmpty} alt = "coins" style={imgStyle} />
        <img src = {CoinEmpty} alt = "coins" style={imgStyle} />
        </div>
        , document.getElementById('dollarSigns'));  
        ReactDOM.render(<span> is under $20 </span>, document.getElementById('cost'));
        this.firebase.auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            this.firebase.preferences(authUser.uid).update({
              Cost: 0,
            });
          }
        })
        break;
      case 1:
        ReactDOM.render(<div><img src = {CoinFull} alt = "coins" style={imgStyle} />
        <img src = {CoinFull} alt = "coins" style={imgStyle} />
        <img src = {CoinEmpty} alt = "coins" style={imgStyle} />
        </div>
        , document.getElementById('dollarSigns'));  
        ReactDOM.render(<span> is under $50 </span>, document.getElementById('cost'));
        this.firebase.auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            this.firebase.preferences(authUser.uid).update({
              Cost: 1,
            });
          }
        })
        break;
        
       case 2:
       {
        ReactDOM.render(<div><img src = {CoinFull} alt = "coins" style={imgStyle} />
        <img src = {CoinFull} alt = "coins" style={imgStyle} />
        <img src = {CoinFull} alt = "coins" style={imgStyle} />
        </div>
        , document.getElementById('dollarSigns'));  
        ReactDOM.render(<span> is above $50 </span>, document.getElementById('cost'));
        this.firebase.auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            this.firebase.preferences(authUser.uid).update({
              Cost: 2,
            });
          }
        })
       }
    }});
 
  };
  /*Renders the slide for the money range, coins corresponding to the value and the $ range as a list item.
   */
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ListItem>
          <ListItemIcon>
              <Typography id="label">
                <h6>
                  Cost 
                  <span id="cost" style={{marginRight: '10vw'}}>
                  </span>
                </h6>
              </Typography>
              
            </ListItemIcon>
            <div id ="dollarSigns"></div>
        </ListItem>
        <ListItem>
          
          <Slider
            classes={{ container: classes.slider }}
            value={this.state.value}
            min={0}
            max={2}
            step={1}
            onChange={this.handleChange}

          />
        </ListItem>
        
        
      </div>
    );
  }
}

StepSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepSlider);

