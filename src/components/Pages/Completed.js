import React from "react";
import Firebase from '../firebase'
import CircularProgress from '@material-ui/core/CircularProgress'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import AutorenewIcon from '@material-ui/icons/Autorenew'

import Chip from '@material-ui/core/Chip';

import IconButton from '@material-ui/core/IconButton'

class Completed extends React.Component {
    firebase = new Firebase();
    constructor(props) {
        super(props);

        this.state = {
            completed: null,
            loading: true,
        };
    }

    componentDidMount() {
        this.firebase.auth.onAuthStateChanged(user => {
            if (user) {
                this.firebase.completed(user.uid).once('value', snapshot => {
                    this.setState({
                        completed: snapshot.val(),
                        loading: false,
                    });
                });
            }
        });
    }
    /*
    <Chip
    style={{ height: '22px', marginLeft: '1em', color: 'white', borderColor: 'white', background: `${icons[x[0]]['color']}` }}
    icon={icons[x[0]]['icon']}
    label={x[1]}
    onClick={this.handleChip}
/>*/
    render() {
        if (this.state.loading) {
            return (
                <div style={{ marginTop: '40vh', display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </div>
            );
        }

        const completed = Object.entries(this.state.completed);
        console.log(completed);
        //{completed.map(quest => console.log(quest))}
        return (
            <div>
                Completed Quests
                <List>
                    <ListItem>
                        <Chip style={{margin: 0, padding: 0}} label="test" />
                        <Chip style={{margin: 0, padding: 0}} label="test2" />
                        <ListItemText  
                        primary="Bike the Seawall"
                        secondary="May 20th" />
                        
                        <ListItemSecondaryAction>
                            <IconButton>
                                <AutorenewIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </div>)
    }
}

export default Completed;