import React from "react";

import Logo from "../../img/pickr-logo-blue2.PNG";

import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

const textColor = '#e3f2fd';

class NavDrawer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <SwipeableDrawer ModalProps={{ BackdropProps: { invisible: false } }}
                PaperProps={{ style: { background: '#0d47a1' } }}
                variant="temporary" open={this.props.open}
                onClose={this.props.close} >
                <div>
                    <List style={{minWidth: '235px'}} component="nav">
                        <div style={{ textAlign: 'center', paddingTop: '12px' }}>
                            <img src={Logo} style={{ maxWidth: '150px' }} />
                        </div>
                        <ListItem>
                        </ListItem>
                        <ListItem component={Link} to={ROUTES.HOME} onClick={this.props.close} button>
                            <ListItemIcon style={{ color: textColor }}>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ style: { color: textColor } }} primary="Quests" />
                        </ListItem>
                        <hr style={{borderColor: '#e3f2fd55'}} />
                        <ListItem component={Link} to={ROUTES.FAVS} onClick={this.props.close} button>
                            <ListItemIcon style={{ color: textColor }}>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ style: { color: textColor } }} primary="Favourites" />
                        </ListItem>
                        <ListItem component={Link} to={ROUTES.COMPLETED} onClick={this.props.close} button>
                            <ListItemIcon style={{ color: textColor }}>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ style: { color: textColor } }} primary="Completed" />
                        </ListItem>
                        <ListItem component={Link} to={ROUTES.BADGES} onClick={this.props.close} button>
                            <ListItemIcon style={{ color: textColor }}>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ style: { color: textColor } }} primary="Badges" />
                        </ListItem>
                        <hr style={{borderColor: '#e3f2fd55'}} />
                        <ListItem onClick={this.props.close} button>
                            <ListItemIcon style={{ color: textColor }}>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ style: { color: textColor } }} primary="Settings" />
                        </ListItem>
                        <ListItem component={Link} to={ROUTES.ABOUT} onClick={this.props.close} button>
                            <ListItemIcon style={{ color: textColor }}>
                                <InboxIcon />
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