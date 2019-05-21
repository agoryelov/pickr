import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import Firebase from '../firebase';

const styles = {
  root: {
    width: 125,
  },
  slider: {
    padding: '22px 0px',
  },
};

class SimpleSlider extends React.Component {
  firebase = new Firebase();
  state = {
    value: 30,
  };
  componentDidMount() {
    this.firebase.auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
        if (authUser) {
            this.setState({ authUser });
            this.userPreferences = this.firebase.preferences(authUser.uid);
            this.userPreferences.once("value", snapshot => {
            this.setState({value : snapshot.val().Distance,})    

                   
                   console.log(this.state.checked);
                   
            
                
            })
            
        } else {
            this.setState({ authUser: null });
            
        }
    });
  }
  handleChange = (event, value) => {
    this.setState({ value });
    this.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.firebase.preferences(authUser.uid).update({
          Distance: value,
        });
      }
    })
  }; 

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const lessThan = '<';
    return (
      <div className={classes.root}>
        <Typography id="label"><b>Distance</b> {lessThan} {this.state.value}km </Typography>
        <Slider
          classes={{ container: classes.slider }}
          value={value}
          aria-labelledby="label"
          onChange={this.handleChange}
          max={30}
          min={1}
          step={1}
        />
      </div>
    );
  }
}

SimpleSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlider);
