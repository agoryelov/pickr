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
import IconButton from '@material-ui/core/IconButton';


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
    },
    slider: {
        width: 150,
    }
};
class SwipeableTemporaryDrawer extends React.Component {
    state = {
      right: false,
    };
  
    toggleDrawer = (side, open) => () => {
      this.setState({
        [side]: open,
      });
    };
  
    render() {
      const { classes } = this.props;
      
      
  
      const sideList = (
        <div className={classes.list}>
          <List>
            {[' ',].map((text, index) => (
                <ListItem button key={text}>
                    <div className={classes.drawerHeader}>
                        
                            <ListItemIcon>
                                <IconButton onClick={this.toggleDrawer('right', false)}>
                                    <ChevronRightIcon />
                                </IconButton>
                            </ListItemIcon>
                     </div>
                    <ListItemText primary={text} />
                </ListItem>
                ))}
          </List>
          <Divider />
          <List>
            {[<MoneySlide />, <DistSlide />,].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? '$' : ''}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                ))}
          </List>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      );
  
  
      return (
        <div>
          
          <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>
          
         
          <SwipeableDrawer
            anchor="right"
            open={this.state.right}
            onClose={this.toggleDrawer('right', false)}
            onOpen={this.toggleDrawer('right', true)}
          >
            <div
              tabIndex={0}
              role="button"
              /*onClick={this.toggleDrawer('right', false)}*/
              onKeyDown={this.toggleDrawer('right', false)}
            >
              {sideList}
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
