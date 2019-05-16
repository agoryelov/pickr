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
    catPrompt: {
        textAlign: 'center',
        marginTop: 10,

    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
        height: 40,
    },
    slider: {
        width: 150,
    }
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
        <div className={classes.fulllist}>
          <List>
            <ListItem>
              <div className={classes.drawerHeader}>
                <ListItemText primary={""} />
                <ListItemIcon>
                  <IconButton onClick={this.toggleDrawer('bottom', false)}> 
                  Preferences &nbsp;
                    <ChevronRightIcon />
                  </IconButton>
                </ListItemIcon>
                <Divider />
              </div>

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
          <Button onClick={this.toggleDrawer('bottom', true)}>Open Bottomt</Button>
          
         
          <SwipeableDrawer
            
            anchor="right"
            open={this.state.bottom}
            onClose={this.toggleDrawer('bottom', false)}
            onOpen={this.toggleDrawer('bottom', true)}
          >
            <div
              tabIndex={0}
              role="button"
              /*onClick={this.toggleDrawer('bottom', false)}*/
             onKeyDown={this.toggleDrawer('bottom', false)}
            >
              {fullList}
            </div>
          </SwipeableDrawer>
        </div>
      );
    }
  }
  
  SwipeableTemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SwipeableTemporaryDrawer);

class Preferences extends Component {
    firebase = new Firebase();
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
            
        };
    }


    componentDidMount() {
        this.firebase.auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                this.setState({ authUser });
            } else {
                this.setState({ authUser: null });
            }
        });
    }
 
    render() {
        return(
            <div></div>
        
        )
    }
}

//export default Preferences;
