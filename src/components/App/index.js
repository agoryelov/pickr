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
import CircularProgress from '@material-ui/core/CircularProgress';

import PreferencesDesktop from '../Layout/PreferencesDesktop';

class App extends Component {
    firebase = new Firebase();
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
            data: null,
            test: 'test',
            curPosition: null,
            loading: true,
        };
    }
    


    componentDidMount() {
        this.firebase.auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                this.setState({ authUser });
                this.firebase.questsAll().once("value", snapshot => {
                    this.setState({
                        data: Object.entries(snapshot.val()),
                        loading: false,
                    });

                });
            } else {
                this.setState({ authUser: null });
            }
        });
    }

    render() {

        if (this.state.loading) {
            return (
              <div style={{marginTop: '40vh', display: 'flex', justifyContent: 'center'}}>
                <CircularProgress />
              </div>
            );
        }
        return(
            <Router>

                <Grid container justify='center' style={{backgroundImage: `url(${Background})`, backgroundSize: '100% auto' }}>
          
                    <Grid item xs={12} sm={12} md={12} style={{position: 'sticky', top: '0', maxHeight: '104px'}}>

                        <AppBar style={{background: '#2196F3', top: 0}} position="sticky" elevation={1}>
                            <HeaderAppBar authUser={this.state.authUser} />
                        </AppBar>
                    </Grid>
                   
                    <Grid item  md={2} style={{background: '#f5f5f5', height: 'calc(100vh - 104px)', overflow: 'scroll',marginTop:'8px', }} >
                        <div style={{background:'#f5f5f5', width: '220px', overflowX: 'hidden', marginTop: '10px',}}>
                            <PreferencesDesktop  />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={10} md={8} style={{background: 'white', height: 'calc(100vh - 104px)', overflow: 'scroll'}}>
                        <Route exact path={ROUTES.HOME} render={(props) => <QuestPage {...props} data={this.state.data} /> } />
                        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                        <Route path={ROUTES.BADGES} component={BadgesPage} />
                        <Route path={ROUTES.FAVS} component={FavouritesPage} />
                        <Route path={ROUTES.ABOUT} component={AboutPage} />
                        <Route path={ROUTES.SWEEP} component={SweepPage} />

                    </Grid>
                    <Grid item md={2}> </Grid>
                    
                </Grid>
                
            </Router>
        )
    }
}

export default App;