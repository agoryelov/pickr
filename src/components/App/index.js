import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SignUpPage from '../Pages/SignUp';
import SignInPage from '../Pages/SignIn';

import AppBarHeader from './Header3'
import NavDrawer from './NavDrawer'
import NavDrawerDesktop from './NavDrawerDesktop'
import AppContent from './AppContent'

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import './index.css';
import Logo from "../../img/pickr-logo-blue2.PNG";

import Hidden from '@material-ui/core/Hidden';

import * as ROUTES from '../../constants/routes';
import Firebase from '../firebase';
import CircularProgress from '@material-ui/core/CircularProgress';




class App extends Component {
    firebase = new Firebase();
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
            drawer: false,
            loading: true,
            coords: null,
            data: null,
        };
    }

    toggleDrawer = () => {
        this.setState({
            drawer: !this.state.drawer,
        })
    }

    componentDidMount() {

        //Getting user location
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({ coords: position.coords });
        });

        this.firebase.auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                this.setState({ authUser: authUser });
                this.firebase.questsAll().once("value", snapshot => {
                    this.setState({
                        data: snapshot.val(),
                        loading: false
                    })
                });
            } else {
                this.setState({ authUser: null, loading: false });
            }
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <div style={{ marginTop: '40vh', display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </div>
            );
        }
        const user = this.state.authUser;
        const data = this.state.data;
        const loginFlow = <div>
            <Route exact path={ROUTES.HOME} component={SignInPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            </div>;
        return (
            <Router>
                <NavDrawer open={this.state.drawer} close={this.toggleDrawer} />
                <Grid container>
                    <Grid item style={{ position: 'sticky', top: '0', maxHeight: '64px', width: '100vw', zIndex: '1200' }}>
                        <AppBarHeader open={this.toggleDrawer} authUser={user} />
                    </Grid>
                    <Grid item xs={12}>
                        {user ? <AppContent authUser={user} coords={this.state.coords} data={data} /> : loginFlow}
                    </Grid>
                </Grid>
            </Router>
        )
    }
}

export default App;