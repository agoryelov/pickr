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


const catNum = 10;

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
            badPrefs: null,
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
                    }) 
                }).then(() => {
                    this.firebase.preferences(authUser.uid).once('value', snapshot => {
                        const snap = snapshot.val();
                        let badPrefs = [];
                        for (let category in snap) {
                            if (snap[category] == false) {
                                badPrefs.push(category);
                            }
                        }

                        if(addFlag) {
                            realQuests.push(this.state.data[index]);
                        }
                      
                    
                    console.log(realQuests.length);
                    console.log(realQuests);
                    this.setState({
                        data: realQuests,
                    });
                });
                this.userPreferences = this.firebase.preferences(authUser.uid);
                this.userPreferences.once("value", snapshot => {
                    let arrayOfBadPrefs = [];

                   for(let x  = 0; x < catNum; x++) {
                        if (Object.entries(snapshot.val())[x][1] == false){
                            arrayOfBadPrefs.push(Object.entries(snapshot.val())[x][0])
                        }
                    }

                    this.setState({
                        badPrefs: arrayOfBadPrefs
                    });
                    console.log(this.state.data.length);
                    console.log("After prefs:");
                    var realQuests = [];
                    var addFlag;

                    for(var index in this.state.data) {
                        addFlag = true;
                        for(var cats in this.state.data[index]["categories"]) {

                          for(var badpref of this.state.badPrefs) {
                               if(badpref == cats) {
                                   addFlag = false;
                               }
                          }
                        }
                        if(addFlag) {
                            realQuests.push(this.state.data[index]);
                        }

                    }
                    console.log(typeof(realQuests));
                    this.setState({
                        data: realQuests,
                    });
                });
            } else {
                this.setState({
                        authUser: null,
                        data: snapshot.val(),
                        loading: false,
                    });
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
        console.log(this.state.badPrefs)
        const user = this.state.authUser;
        const data = Object.entries(this.state.data);
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