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
import MoneySlide from './SliderMoney';
import DistSlide from './SliderDistance';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CheckboxList from '../Layout/prefButtons';





const styles = {

};


class SwipeableTemporaryDrawer extends React.Component {
    state = {
      bottom: false,
      
    };
    toggleDrawer = (side, open) => () => {

      this.setState({
        [side]: open,
      });
    };
  
    render() {
      const { classes } = this.props;
      
      
  
      const fullList = (
        <div style={{padding: '0', margin: '0', width: '200px'}} >
          <List>
            <ListItem>
               
                  Preferences
                <Divider />

            </ListItem>
            
            <ListItem>
              <MoneySlide />
            </ListItem>
            <ListItem>
              <DistSlide />
            </ListItem>
          </List>
          <Divider />
          <CheckboxList />
          
        </div>
      );
  
  
      return (
        <div>
          {fullList}
        </div>
      );
    }
  }
  
  SwipeableTemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SwipeableTemporaryDrawer);
