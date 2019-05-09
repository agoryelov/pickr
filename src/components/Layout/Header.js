import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import Firebase from '../firebase'

function HeaderAppBar(props) {

  function handleLogout() {
    const firebase = new Firebase();
    firebase.signOut();
  }

  function handleLogin() {
    //document.body.requestFullscreen();
  }

  let button;
  if (props.authUser) {
    button = <Button component={Link} to={ROUTES.LANDING} onClick={handleLogout} color="inherit">Logout</Button>;
  } else {
    button = <Button component={Link} to={ROUTES.SIGN_IN} onClick={handleLogin} color="inherit">Login</Button>;
  }

  return (
    <div className="header-root">
      <AppBar style={{background: '#18EAAF', position: 'fixed', top: 0}} position="static">
        <Toolbar>
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
  );
}

export default HeaderAppBar;