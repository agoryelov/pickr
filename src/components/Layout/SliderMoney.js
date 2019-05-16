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

const styles = {
  root: {
    width: 200,
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
    value: 2,
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
                  ReactDOM.render(<span>{lessThan} $20 </span>, document.getElementById('cost'));
                  break;
                case 1:
                  ReactDOM.render(<div><img src = {CoinFull} alt = "coins" style={imgStyle} />
                  <img src = {CoinFull} alt = "coins" style={imgStyle} />
                  <img src = {CoinEmpty} alt = "coins" style={imgStyle} />
                  </div>
                  , document.getElementById('dollarSigns'));  
                  ReactDOM.render(<span>{lessThan} $50 </span>, document.getElementById('cost'))
                  break;
                default:
                  ReactDOM.render(<div><img src = {CoinFull} alt = "coins" style={imgStyle} />
                  <img src = {CoinFull} alt = "coins" style={imgStyle} />
                  <img src = {CoinFull} alt = "coins" style={imgStyle} />
                  </div>
                  , document.getElementById('dollarSigns'));   
                  ReactDOM.render(<span> {greaterThan} $50 </span>, document.getElementById('cost'));
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
        ReactDOM.render(<span>{lessThan} $20 </span>, document.getElementById('cost'));
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
        ReactDOM.render(<span>{lessThan} $50 </span>, document.getElementById('cost'));
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
        ReactDOM.render(<span> {greaterThan} $50 </span>, document.getElementById('cost'));
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
        <Typography id="label"><b>Cost</b> <span id="cost"></span></Typography>
        <span id ="dollarSigns"></span>
        <Slider
          classes={{ container: classes.slider }}
          value={this.state.value}
          min={0}
          max={2}
          step={1}
          onChange={this.handleChange}
        />
        
        
      </div>
    );
  }
}

StepSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepSlider);

