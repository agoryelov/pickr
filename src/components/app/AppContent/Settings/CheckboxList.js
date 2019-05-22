import React from 'react';
import PropTypes from 'prop-types';
import Firebase from '../../../firebase';
// Material UI's utility and styling components
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';


import CircularProgress from '@material-ui/core/CircularProgress';

//Creative Icon
import CreativeIcon from '@material-ui/icons/Brush';

//Nature Icon
import NatureIcon from '@material-ui/icons/FilterHdr';

//Fitness Icon
import FitnessIcon from '@material-ui/icons/FitnessCenter';

//Food Icon
import FastIcon from '@material-ui/icons/Fastfood';

//Romantic Icon
import RomanticIcon from '@material-ui/icons/Favorite';

//Culture Icon
import LibraryIcon from '@material-ui/icons/LocalLibrary';

//Volunteer Icon
import SupervisorIcon from '@material-ui/icons/SupervisorAccount';

//Games Icon
import GamesIcon from '@material-ui/icons/Games';

import { ListItemIcon } from '@material-ui/core';
// Checkbox list styles
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 200,
    backgroundColor: '#f5f5f5',
  },
});
//Class that renders the user preference buttons under settings
class CheckboxList extends React.Component {
  // Call access to the Firebase database.
    firebase = new Firebase();
    

  state = {
    checked: [], // All checked preferences
    userPreferences: null, //Firebase shortcut
    prefTypes: null, //Array of all types of preferences
    loading: true,

  };
  
  
  //Once the component mounts it searches for the user's category preferences and 
  //checks off the ones that are set to true once it is completed loading is set
  //to false so the user can see their preferences.
  componentDidMount() {
    this.firebase.auth.onAuthStateChanged((authUser) => {
        if (authUser) {
            this.setState({ authUser });
            this.userPreferences = this.firebase.preferences(authUser.uid);
            this.userPreferences.once("value", snapshot => {
                this.prefTypes = ['Nature', 'Food', 'Fitness', 'Culture', 'Volunteer', 'Creative', 'Romantic', 'Games'];               
                    if (snapshot.val().Nature) {
                        this.state.checked.push(this.prefTypes[0]);
                        this.handleToggle(this.prefTypes[0])
                    }
                    if (snapshot.val().Food) {
                        this.state.checked.push(this.prefTypes[1]);
                        this.handleToggle(this.prefTypes[1])
                    }
                    if (snapshot.val().Fitness) {
                        this.state.checked.push(this.prefTypes[2]);
                        this.handleToggle(this.prefTypes[2])
                    }
                    if (snapshot.val().Culture) {
                      this.state.checked.push(this.prefTypes[3]);
                      this.handleToggle(this.prefTypes[3])
                    }
                    if (snapshot.val().Volunteer) {
                      this.state.checked.push(this.prefTypes[4]);
                      this.handleToggle(this.prefTypes[4])
                    }
                    if (snapshot.val().Creative) {
                      this.state.checked.push(this.prefTypes[5]);
                      this.handleToggle(this.prefTypes[5])
                    }
                    if (snapshot.val().Romantic) {
                      this.state.checked.push(this.prefTypes[6]);
                      this.handleToggle(this.prefTypes[6])
                    }
                    if (snapshot.val().Games) {
                        this.state.checked.push(this.prefTypes[7]);
                        this.handleToggle(this.prefTypes[7])
                    }

                    this.setState({
                      loading: false,
                  });

                   
            
                
            })

        } else {
            this.setState({ authUser: null });
            
        }
    });
}
  //When one of the preferences is clicked or pressed it toggles the value on firebase to true
  //or false. It also handles the change and shows the corresponding checkbox.
  handleToggle = value => () => {

    const { checked } = this.state;
    
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    
    this.firebase.auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          
            this.firebase.preferencesWrite(authUser.uid, value).once("value").then((snapshot) => {
            if (snapshot.val() == true){
              this.firebase.preferences(authUser.uid).update({
                [value]: false,
              });
            }else {
              this.firebase.preferences(authUser.uid).update({
                [value]: true,
              });
            }
            })
            
        }
        
    });
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
    console.log(this.state.checked);
    
    
  };
  
  render() {
    
    const { classes } = this.props;
    //Icons to be displayed next to the corresponding categories
    const icons = {
      Fitness: {
          icon: <FitnessIcon />,
          color: "#0277bdCC"
      },
      Creative: {
          icon: <CreativeIcon />,
          color: "#fbc02dAA"
      },
      Nature: {
          icon: <NatureIcon  />,
          color: "#66bb6aCC"
      },
      Culture: {
          icon: <LibraryIcon />,
          color: "#8e24aaCC"
      },
      Food: {
          icon: <FastIcon  />,
          color: "#8d6e63CC"
      },
      Romantic: {
          icon: <RomanticIcon />,
          color: "#ec407aCC"
      },
      Volunteer: {
          icon: <SupervisorIcon />,
          color: "#ec407aCC"
      },
      Games: {
          icon: <GamesIcon  />,
          color: "#ec407aCC"
      },
  };
    if (this.state.loading) {
      //If firebase is still retreiving the user data it will display a loading circle
      return (
        <div style={{marginTop: '40vh', display: 'flex', justifyContent: 'center'}}>
          <CircularProgress />
        </div>
      );
  }
    //Uses map to put the catergory icon, name and button together in a list item that will be placed in 
    //their settings
    return (
    <div>
        {['Nature', 'Food', 'Fitness', 'Culture', 'Volunteer', 'Creative', 'Romantic', 'Games'].map(value => (
          <ListItem key={value} role={undefined}  dense button onClick={this.handleToggle(value)}>
            <ListItemIcon >
              
              {icons[value].icon}
            </ListItemIcon>
            <ListItemText primary={`${value}`} />
            <Checkbox
              checked={this.state.checked.indexOf(value) !== -1}
              tabIndex={-1}
              disableRipple
            />
            
          </ListItem>
        ))}

      </div>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxList);
