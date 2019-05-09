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
import Firebase from '../firebase'

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
                <HeaderAppBar authUser={this.state.authUser} />
                <div style={{marginBottom: '100px', marginTop: '75px'}}>
                    <Route exact path={ROUTES.LANDING} component={LandingPage} />
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                    <Route path={ROUTES.HOME} component={HomePage} />
                    <Route path={ROUTES.BADGES} component={BadgesPage} />
                    <Route path={ROUTES.FAVS} component={FavouritesPage} />
                </div>
                <BottomNav />
            </Router>
        )
    }
}

export default App;