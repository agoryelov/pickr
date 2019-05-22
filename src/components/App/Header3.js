import React from "react";

//Routing and custom firebase library
import Firebase from '../firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

//Header styling components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

//Button styling components
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

//Utility component to hide elements using media queries
import Hidden from '@material-ui/core/Hidden';

//Pickr Logo
import Logo from "../../img/pickr-logo-blue2.PNG";

class AppBarHeader extends React.Component {
    // Call access to the Firebase database
    firebase = new Firebase();

    //Grab props from parent
    constructor(props) {
        super(props);
    }

    //Handle logout button press
    handleLogout = () => {
        this.firebase.signOut();
    }

    //Handle login button press
    handleLogin = () => {
        //TODO
    }

    render() {
        //Grab authenticated user from parent, this will be null if not logged in
        const user = this.props.authUser;

        //Choose whether to display the login or logout button
        let button;
        if (user) {
          button = <Button component={Link} to={ROUTES.SIGN_IN} onClick={this.handleLogout} color="inherit">Logout</Button>;
        } else {
          button = <Button component={Link} to={ROUTES.SIGN_IN} onClick={this.handleLogin} color="inherit">Login</Button>;
        }

        //JSX
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