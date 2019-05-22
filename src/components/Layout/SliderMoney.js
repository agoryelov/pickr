import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';
import Firebase from '../firebase';
import ReactDOM from 'react-dom';
import CoinFull from './../../img/coinsFull.png';
import CoinEmpty from './../../img/coinsEmpty.png';
import { ifStatement } from '@babel/types';
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
const imgStyle = {
  height: 30,
  width: 30,

};

class StepSlider extends React.Component {
  firebase = new Firebase();
  state = {
    value: 0,
    moneySigns: null,
  };

  componentDidMount() {
    console.log("Mounted");
    this.firebase.auth.onAuthStateChanged((authUser) => {
      
        if (authUser) {
          var lessThan = '<';
          var greaterThan = '>';
            this.setState({ authUser });
            this.userPreferences = this.firebase.preferences(authUser.uid);
            this.userPreferences.once("value", snapshot => {
              console.log("snap" + snapshot.val());
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
              
              //document.getElementById("dollarSigns").setInnerHTML(this.state.moneySigns);
              console.log(this.state.checked);
            })
            
        } else {
            this.setState({ authUser: null });
            
        }
    });
}
  handleChange = (event, value) => {
    var lessThan = '<';
    var greaterThan = '>';
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
  
  render() {
    const { classes } = this.props;
    const { value } = this.state.value;
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

