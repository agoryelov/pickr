import React from "react";
import Grid from '@material-ui/core/Grid';
import * as ROUTES from '../../constants/routes';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import QuestPage from '../Pages/QuestPage';
import CompletedPage from '../Pages/Completed'
import BadgesPage from '../Pages/Badges';
import FavouritesPage from '../Pages/Favourites';
import AboutPage from '../Pages/About';
import SweepPage from '../Pages/Sweep';
import UserPreferencesPage from '../Pages/UserPreferences';

import NavDrawerDesktop from './NavDrawerDesktop'
import Hidden from '@material-ui/core/Hidden';

class AppContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Hidden smDown>
                        <Grid item xs={2}>
                            <NavDrawerDesktop />
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} sm={6}>
                        <div style={{ overflow: 'scroll', height: 'calc(100vh - 64px)' }}>
                            <Route exact path={ROUTES.HOME} render={(props) => <QuestPage {...props} authUser={this.props.authUser} coords={this.props.coords} data={this.props.data} /> } />
                            <Route path={ROUTES.BADGES} component={BadgesPage} />
                            <Route path={ROUTES.COMPLETED} render={(props) => <CompletedPage {...props} data={this.props.data} /> } />
                            <Route path={ROUTES.ABOUT} component={AboutPage} />
                            <Route path={ROUTES.SWEEP} component={SweepPage} />
                            <Route path={ROUTES.PREFERENCES} component={UserPreferencesPage} />
                            <Hidden smUp><Route path={ROUTES.FAVS} render={(props) => <FavouritesPage {...props} coords={this.props.coords} data={this.props.data} /> } /></Hidden>
                        </div>
                    </Grid>
                    <Hidden xsDown>
                        <Grid item sm={6} md={4}>
                            <div style={{ height: 'calc(100vh - 64px)', overflow: 'scroll', background: '#eaeaea' }}>
                                <FavouritesPage data={this.props.data} />
                            </div>
                        </Grid>
                    </Hidden>
                </Grid>
            </div>)
    }
}

export default AppContent;