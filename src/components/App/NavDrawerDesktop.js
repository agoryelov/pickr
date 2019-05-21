import React from "react";

import Logo from "../../img/pickr-logo-blue2.PNG";

import InboxIcon from '@material-ui/icons/Inbox';
import CollectionsIcon from '@material-ui/icons/Collections';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

const textColor = '#e3f2fd';

class NavDrawer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div style={{ background: '#1565c0', width: '100%', height: '100%', paddingTop: '12px' }}>
                <List component="nav">
                    <ListItem component={Link} to={ROUTES.HOME} button>
                        <ListItemIcon style={{ color: textColor }}>
                            <CollectionsIcon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ style: { color: textColor } }} primary="Quests" />
                    </ListItem>
                    <hr style={{ borderColor: '#e3f2fd55' }} />
                    <ListItem component={Link} to={ROUTES.COMPLETED} button>
                        <ListItemIcon style={{ color: textColor }}>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ style: { color: textColor } }} primary="Completed" />
                    </ListItem>
                    <ListItem component={Link} to={ROUTES.BADGES} button>
                        <ListItemIcon style={{ color: textColor }}>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ style: { color: textColor } }} primary="Badges" />
                    </ListItem>
                    <hr style={{ borderColor: '#e3f2fd55' }} />
                    <ListItem component={Link} to={ROUTES.PREFERENCES} button>
                        <ListItemIcon style={{ color: textColor }}>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ style: { color: textColor } }} primary="Settings" />
                    </ListItem>
                    <ListItem component={Link} to={ROUTES.ABOUT} button>
                        <ListItemIcon style={{ color: textColor }}>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ style: { color: textColor } }} primary="About Us" />
                    </ListItem>
                </List>
            </div>)
    }
}

export default NavDrawer;