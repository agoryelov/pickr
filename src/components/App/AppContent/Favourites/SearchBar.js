import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const root = {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '400px',
    };

    input: {
        marginLeft: 8,
        flex: 1,
    },

    iconButton: {
        padding: 10,
    },

    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
});

const classes = useStyles();

class SearchBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            questList: null,
        }
    }

    componentWillMount() {

    }
    
    render() {
        return(
            <Paper className = {classes.root}>
                <InputBase 
                    className = {classes.input}
                    placeholder = "Search Quests"
                    inputProps = {{'aria-label': 'search quests'}}
                />
                <IconButton className = {classes.iconButton} aria-label = "search">
                    <SearchIcon />
                </IconButton> 
            </Paper>
        )}
}

export default SearchBar;