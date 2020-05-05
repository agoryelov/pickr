import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SignUpPage from './Auth/SignUp';
import SignInPage from './Auth/SignIn';

import AppBarHeader from './Header';
import NavDrawer from './NavMobile';
import AppContent from './AppContent/AppContent';

// Material-ui imports
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import '../css/index.css';

import * as ROUTES from '../constants/routes';
import Firebase from '../firebase';


// Number of categories that the quests can be organized by.
const catNum = 10;

/** This is a major component of our Application that is present on each page and
 * passes user data to the children components. 
 */
class App extends Component {
    // Call access to the Firebase database.
    firebase = new Firebase();

    //Grab props from parent
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
            drawer: false,
            loading: true,
            coords: null,
            data: null,
            badPrefs: null,
            distPref: null,
        };
    }

    // function for toggling the side menu
    toggleDrawer = () => {
        this.setState({
            drawer: !this.state.drawer,
        })
    }

    componentWillMount() {
        let arrayOfBadPrefs = [];
        var realQuests = [];
        //Getting user location
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({ coords: position.coords });
        });

        // Action to occur when the status of the user's authentication has been changed
        this.firebase.auth.onAuthStateChanged((authUser) => {
            // if the user has been authenticated
            if (authUser) {
                this.firebase.questsAll().once('value', snapshot => {
                    this.setState({data: Object.entries(snapshot.val())});
                }).then(() => {
                    this.firebase.preferences(authUser.uid).once('value', snapshot => {
                        const prefSnap = Object.entries(snapshot.val());
                        
                        // Grabs the unwanted preferences of the user.
                        for (let x = 0; x < catNum; x++) {
                            if (prefSnap[x][1] === false) {
                                arrayOfBadPrefs.push(prefSnap[x][0]);
                            }
                        }
                        // Store the unwanted preferences of the user.
                        this.setState({ badPrefs: arrayOfBadPrefs});

                        let addFlag;

                        // The first for loop runs through all of the loaded quests.
                        for (let questies of this.state.data) {
                            addFlag = true;
                            // The second for loop runs through the categories of each quest.
                            for (let cats in questies[1]['categories']) {
                                // The third for loop runs through the users' unwanted preferences.
                                for (let bPref of this.state.badPrefs) {
                                    if (cats === bPref) {
                                        addFlag = false;
                                    }
                                }
                            }
                            
                            // If the quest has no unwanted preferences, it is added to the displayed quests.
                            if (addFlag) {
                                realQuests.push(questies);
                            }
                        }
                    }).then(() => {
                        this.setState({
                            data: realQuests,
                            authUser: authUser,
                            loading: false
                        });
                    });
                });
            }  
            else {
                this.setState({ authUser: null, loading: false});
            }
        });
    }

    render() {
        // Calls the loading screen if the user has not been authenticated.
        if (this.state.loading) {
            return (
                <div style={{ marginTop: '40vh', display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </div>
            );
        }
        const user = this.state.authUser;
        const data = this.state.data;
        // Reroutes the user to the sign-up/login pages if user is not authenticated.
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
                    <Grid item md={2}> </Grid>
                    
                </Grid>
                
            </Router>
        )
    }
}

export default App;