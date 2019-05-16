import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Firebase from '../firebase';
import Profile from './profile';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import Preferences from '../Layout/Preferences';

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

class Header2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: null,
            anchorEl: null,
        };
    }
      handleChange = event => {
        this.setState({ auth: event.target.checked });
      };
    
      handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };
    
    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const handleLogout = () => {
            const firebase = new Firebase();
            firebase.signOut();
            this.setState({auth: false});
          }
        
        const handleLogin = () => {
            //document.body.requestFullscreen();
            this.setState({auth: true});
          }
        let button;
        if (this.props.authUser) {
            button = 
            <div>
                <IconButton 
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                    >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}>
                    <Preferences onClick={this.handleClose} />
                    <Button component={Link} to={ROUTES.LANDING} onClick={handleLogout} onClick={this.handleClose} color="inherit">Logout</Button>
                    <br/>
                    <Button onClick={this.handleClose}>Cancel</Button>
                
                </Menu>
            </div>;
        } else {
            button = <Button component={Link} to={ROUTES.SIGN_IN} onClick={handleLogin} color="inherit">Login</Button>;
        }
    return(
        <div className="header-root">
        <AppBar style={{background: '#2196F3', top: 0, maxHeight: '56px'}} position="sticky" elevation={1}>
            <Toolbar style={{height: '56px'}}>
            <IconButton className="menuButton" color="inherit">
                <MenuIcon />
            </IconButton>
            <Typography style={{ flexGrow: '1'}} variant="h6" color="inherit" className="grow">
                PICKR
            </Typography>
                {button}
            </Toolbar>
        </AppBar>
        
        
        </div>
    )
    }
    
}
export default withStyles(styles)(Header2);