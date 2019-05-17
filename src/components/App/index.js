import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPage from '../Pages/Landing';
import SignUpPage from '../Pages/SignUp';
import SignInPage from '../Pages/SignIn';
import HomePage from '../Pages/HomePage';
import QuestPage from '../Pages/QuestPage';
import BadgesPage from '../Pages/Badges';
import FavouritesPage from '../Pages/Favourites';
import AboutPage from '../Pages/About';
import SweepPage from '../Pages/Sweep';

import BottomNav from '../Layout/BottomNav';
import HeaderAppBar from '../Layout/Header2';

import * as ROUTES from '../../constants/routes';
import Firebase from '../firebase';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';

import './index.css';
import Background from '../../img/bg3.jpg';

class App extends Component {
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
            <Router>
                <Grid container justify='center' style={{backgroundImage: `url(${Background})`, backgroundSize: '100% auto' }}>
                    <Grid item xs={12} sm={10} md={8} style={{position: 'sticky', top: '0', maxHeight: '104px'}}>
                        <AppBar style={{background: '#2196F3', top: 0}} position="sticky" elevation={1}>
                            <HeaderAppBar authUser={this.state.authUser} />
                        </AppBar>
                    </Grid>
                    <Grid item xs={12} sm={10} md={8} style={{background: 'white', height: 'calc(100vh - 104px)', overflow: 'scroll'}}>
                        <Route exact path={ROUTES.LANDING} component={LandingPage} />
                        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                        <Route path={ROUTES.HOME} component={QuestPage} />
                        <Route path={ROUTES.BADGES} component={BadgesPage} />
                        <Route path={ROUTES.FAVS} component={FavouritesPage} />
                        <Route path={ROUTES.ABOUT} component={AboutPage} />
                        <Route path={ROUTES.SWEEP} component={SweepPage} />
                    </Grid>
                </Grid>
            </Router>
        )
    }
}

export default App;