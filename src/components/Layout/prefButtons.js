import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Firebase from '../firebase';
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

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 200,
    backgroundColor: '#f5f5f5',
  },
});

class CheckboxList extends React.Component {
    firebase = new Firebase();
    

  state = {
    checked: [],
    userPreferences: null,
    prefTypes: null,
    pref: null,
    prefTest: null,
    loading: true,

  };
  
  
  
  componentDidMount() {
    this.firebase.auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
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
                   console.log(this.state.checked);
                   
            
                
            })
            
        } else {
            this.setState({ authUser: null });
            
        }
    });
}
  savePrefs = () => {
    console.log("submited");
  }
  handleToggle = value => () => {
      console.log(value);
    const { checked } = this.state;
    
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    
    this.firebase.auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          
            this.firebase.preferencesWrite(authUser.uid, value).once("value").then((snapshot) => {
            if (snapshot.val() == true){
              console.log("if");
              this.firebase.preferences(authUser.uid).update({
                [value]: false,
              });
            }else {
              console.log("else");
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
      return (
        <div style={{marginTop: '40vh', display: 'flex', justifyContent: 'center'}}>
          <CircularProgress />
        </div>
      );
  }
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
