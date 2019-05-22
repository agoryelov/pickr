import React from "react";

//Pickr logo
import Logo from "../img/pickr-logo-blue2.PNG";

//Menu Icon Quests
import CollectionsIcon from '@material-ui/icons/Collections';

//Menu Icon Favourites
import FavoriteIcon from '@material-ui/icons/Favorite';

//Menu Icon Completed
import DoneIcon from '@material-ui/icons/Done';

//Menu Icon Badges
import EqualizerIcon from '@material-ui/icons/Equalizer';

//Menu Icon Settings
import SettingsIcon from '@material-ui/icons/Settings';

//Menu Icon About Us
import GroupIcon from '@material-ui/icons/Group';

//Material style components
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

//Routing constants and modules
import * as ROUTES from '../constants/routes';
import { Link } from 'react-router-dom';

//Color of the icons and buttons in the drawer nav menu
const textColor = '#e3f2fd';

/**
 * Navigation drawer component displayed on the mobile version
 */
class NavDrawer extends React.Component {
    //Grab props from parent
    constructor(props) {
        super(props);
    }

    //JSX
    render() {
        return (<div>
            <SwipeableDrawer ModalProps={{ BackdropProps: { invisible: false } }}
                PaperProps={{ style: { background: '#0d47a1' } }}
                variant="temporary" open={this.props.open}
                onClose={this.props.close} 
                onOpen={() => {}} >
                <div>
                    <List style={{minWidth: '235px'}} component="nav">
                        <div style={{ textAlign: 'center', paddingTop: '12px' }}>
                            <img src={Logo} style={{ maxWidth: '150px' }} />
                        </div>
                        <ListItem>
                        </ListItem>
                        <ListItem component={Link} to={ROUTES.HOME} onClick={this.props.close} button>
                            <ListItemIcon style={{ color: textColor }}>
                                <CollectionsIcon />
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ style: { color: textColor } }} primary="Quests" />
                        </ListItem>
                        <hr style={{borderColor: '#e3f2fd55'}} />
                        <ListItem component={Link} to={ROUTES.FAVS} onClick={this.props.close} button>
                            <ListItemIcon style={{ color: textColor }}>
                                <FavoriteIcon />
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ style: { color: textColor } }} primary="Favourites" />
                        </ListItem>
                        <ListItem component={Link} to={ROUTES.COMPLETED} onClick={this.props.close} button>
                            <ListItemIcon style={{ color: textColor }}>
                                <DoneIcon />
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ style: { color: textColor } }} primary="Completed" />
                        </ListItem>
                        <ListItem component={Link} to={ROUTES.BADGES} onClick={this.props.close} button>
                            <ListItemIcon style={{ color: textColor }}>
                                <EqualizerIcon />
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ style: { color: textColor } }} primary="Badges" />
                        </ListItem>
                        <hr style={{borderColor: '#e3f2fd55'}} />
                        <ListItem component={Link} to={ROUTES.PREFERENCES} onClick={this.props.close} button>
                            <ListItemIcon style={{ color: textColor }}>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ style: { color: textColor } }} primary="Settings" />
                        </ListItem>
                        <ListItem component={Link} to={ROUTES.ABOUT} onClick={this.props.close} button>
                            <ListItemIcon style={{ color: textColor }}>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ style: { color: textColor } }} primary="About Us" />
                        </ListItem>
                    </List>
                </div>
            </SwipeableDrawer>
        </div>)
    }
}

export default NavDrawer;