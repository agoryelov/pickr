import React from 'react';
import PropTypes from 'prop-types';
import Firebase from '../firebase';
// Material UI's utility and styling components
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import { ListItem } from '@material-ui/core';

const styles = {
  root: {
    width: '100%',
  },
  slider: {
    padding: '22px 0px',
  },
};
/*Class that exports a slider in the setting page with the range of distance
quests will be searched in.*/
class SimpleSlider extends React.Component {
  firebase = new Firebase();
  //default value for state is 30
  state = {
    value: 30,
  };
  /*On Mount it checks for the users firebase distance setting value and 
  sets it's state so it can be displayed on the component.*/
  componentDidMount() {
    this.firebase.auth.onAuthStateChanged((authUser) => {
        if (authUser) {
            this.setState({ authUser });
            //Shortcut for accesing userbase prferences on firebase
            this.userPreferences = this.firebase.preferences(authUser.uid);
            this.userPreferences.once("value", snapshot => {
            this.setState({value : snapshot.val().Distance,})                    
            })
            
        } else {
            this.setState({ authUser: null });
            
        }
    });
  }
  /*When the slider is moved it sets the new values state and also stores it in firebase.*/
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
  /* Renders the slider on the settings page as a list item with a title.*/
  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <ListItem>
          <Typography id="label">
            <h6>
              Within {this.state.value}km 
            </h6>
          </Typography>
        </ListItem>
        <ListItem>
          <Slider
            classes={{ container: classes.slider }}
            value={value}
            aria-labelledby="label"
            onChange={this.handleChange}
            max={30}
            min={1}
            step={1}
          />
        </ListItem>
      </div>
    );
  }
}

SimpleSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlider);
