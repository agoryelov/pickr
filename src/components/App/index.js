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

    componentWillMount() {
        let arrayOfBadPrefs = [];
        var realQuests = [];
        //Getting user location
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({ coords: position.coords });
        });

        this.firebase.auth.onAuthStateChanged((authUser) => {
            
            if (authUser) {
                this.setState({ authUser: authUser });
                this.firebase.questsAll().once("value", snapshot => {
                    this.setState({
                        data: Object.entries(snapshot.val())}, ()=>{
                            this.setState({
                                loading: false
                            });
                    });
                /* This section grabs the unselected preferences of the user and stores them in an array */
                this.firebase.preferences(authUser.uid).once("value", snapshot => {
                    for(let x  = 0; x < catNum; x++) {
                        if (Object.entries(snapshot.val())[x][1] == false){
                            arrayOfBadPrefs.push(Object.entries(snapshot.val())[x][0]);
                        }  
                    }
          
                    this.setState({
                        badPrefs: arrayOfBadPrefs}, () =>{
                           console.log(this.state.badPrefs);
                    });
                    
                    var addFlag;

                    /**  The first loop goes through each quest */
                    for(let questies of this.state.data) {
                        addFlag = true;
                         /*The second loop finds the categories of each quest */
                        
                        for(let cats in questies[1]["categories"]) {
                            /*The last loop goes through all of the bad preferences  */
                             for(let bPref of this.state.badPrefs) {
                                if(cats == bPref) {
                                    addFlag = false;
                                }
                               
                            }
    
                        }
                        if(addFlag) {
                            realQuests.push(questies);
                        }
                    }
                    this.setState({
                       data: realQuests, 
                    });
                    console.log("After pref filter:" + this.state.data.length);
                    console.log(this.state.data);
                     
                }); 

              });
               
             
            }  
            else {
                this.setState({ authUser: null, loading: false});
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
                    <Grid item md={2}> </Grid>
                    
                </Grid>
                
            </Router>
        )
    }
}

export default App;