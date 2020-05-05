import React from "react";

//Menu Icon Quests
import CollectionsIcon from '@material-ui/icons/Collections'; 

//Menu Icon Completed
import DoneIcon from '@material-ui/icons/Done';

//Menu Icon Badges
import EqualizerIcon from '@material-ui/icons/Equalizer';

//Menu Icon Settings
import SettingsIcon from '@material-ui/icons/Settings';

//Menu Icon About Us
import GroupIcon from '@material-ui/icons/Group';

//Material list style components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

//Routing constants and modules
import * as ROUTES from '../constants/routes';
import { Link } from 'react-router-dom';

//Color of the icons and buttons in the drawer nav menu
const textColor = '#e3f2fd';

/**
 * Navigation component displayed on the desktop version instead of the swipable drawer.
 */
class NavDrawer extends React.Component {
    //Grab props from parent
    constructor(props) {
        super(props);
    }

    //JSX
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
                            <DoneIcon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ style: { color: textColor } }} primary="Completed" />
                    </ListItem>
                    <ListItem component={Link} to={ROUTES.BADGES} button>
                        <ListItemIcon style={{ color: textColor }}>
                            <EqualizerIcon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ style: { color: textColor } }} primary="Badges" />
                    </ListItem>
                    <hr style={{ borderColor: '#e3f2fd55' }} />
                    <ListItem component={Link} to={ROUTES.PREFERENCES} button>
                        <ListItemIcon style={{ color: textColor }}>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ style: { color: textColor } }} primary="Settings" />
                    </ListItem>
                </List>
            </div>)
    }
}

export default NavDrawer;