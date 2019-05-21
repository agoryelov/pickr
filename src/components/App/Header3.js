import React from "react";

import Firebase from '../firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Hidden from '@material-ui/core/Hidden';

import Logo from "../../img/pickr-logo-blue2.PNG";

class AppBarHeader extends React.Component {
    firebase = new Firebase();
    constructor(props) {
        super(props);

        this.state = {
            sampleData: "test",
        };
    }

    handleLogout = () => {
        this.firebase.signOut();
    }

    handleLogin = () => {
        //Login button pressed
    }

    render() {

        const user = this.props.authUser;

        let button;
        if (user) {
          button = <Button component={Link} to={ROUTES.SIGN_IN} onClick={this.handleLogout} color="inherit">Logout</Button>;
        } else {
          button = <Button component={Link} to={ROUTES.SIGN_IN} onClick={this.handleLogin} color="inherit">Login</Button>;
        }

        return (<div>
            <AppBar position="sticky" style={{ background: '#0d47a1', top: 0 }}>
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton onClick={user ? this.props.open : null} color="inherit">
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <div style={{ flexGrow: '1' }} >
                        <img src={Logo} style={{ maxWidth: '100px', marginLeft: '10px' }} />
                    </div>
                    {button}
                </Toolbar>
            </AppBar>
        </div>)
    }
}

export default AppBarHeader;