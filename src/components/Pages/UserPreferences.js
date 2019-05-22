import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Firebase from '../firebase';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MoneySlide from '../Layout/SliderMoney';
import DistSlide from '../Layout/SliderDistance';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CheckboxList from '../Layout/prefButtons';
import { blue } from '@material-ui/core/colors';


class UserPreferences extends React.Component {  
    
    render() {
      const { classes } = this.props;
      const fullList = (
        <div style={{overflowX: 'hidden'}}>
            <List>
                <ListItem >
                    <div><h2>Search Preferences</h2></div>
                </ListItem>
                <Divider />
                <ListItem >
                    <MoneySlide />
                </ListItem>
                <ListItem>
                    <DistSlide />
                </ListItem>
                <Divider />
                <CheckboxList />
                
            </List>
        </div>
      );
  
  
      return (
        <div>
         
        {fullList}
              
        </div>
      );
    }
  }
  
  UserPreferences.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default (UserPreferences);

