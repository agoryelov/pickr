import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPage from '../Pages/Landing';
import SignUpPage from '../Pages/SignUp';
import SignInPage from '../Pages/SignIn';
import HomePage from '../Pages/HomePage';
import BadgesPage from '../Pages/Badges';
import FavouritesPage from '../Pages/Favourites';

import BottomNav from '../Layout/BottomNav';
import HeaderAppBar from '../Layout/Header'

import * as ROUTES from '../../constants/routes';
import Firebase from '../firebase';

import Grid from '@material-ui/core/Grid';

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
                    <Grid item xs={12} sm={8} md={7} style={{position: 'sticky', top: '0'}}>
                        <HeaderAppBar authUser={this.state.authUser} />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7} style={{background: 'white', height: 'calc(100vh - 112px)', overflow: 'scroll'}}>
                        <Route exact path={ROUTES.LANDING} component={LandingPage} />
                        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                        <Route path={ROUTES.HOME} component={HomePage} />
                        <Route path={ROUTES.BADGES} component={BadgesPage} />
                        <Route path={ROUTES.FAVS} component={FavouritesPage} />
                    </Grid>
                    <Grid item xs={12} sm={8} md={7}>
                        <BottomNav />
                    </Grid>
                </Grid>
            </Router>
        )
    }
}

export default App;