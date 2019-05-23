import React from "react";
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import '../../../css/QuestPage.css'

import QuestCard from './QuestCard';
import Snackbar from '@material-ui/core/Snackbar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

/** The page where the users' preferred quests will be loaded. */
class QuestPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
            loading: true,
            current: 1,
            userCoords: null,
            virtualData: null,
            globaUser: null,
            snackbar: false,
        };
        
        this.swiper = null;
    }
    
    // Updates the index of the card when a user swipes.
    updateIndex = () => {
        if (this.swiper != null) {
            this.setState({ current: this.swiper.activeIndex });
        }
    }

    toggleSnackbar = (e) => {
        this.setState({
            snackbar: !this.state.snackbar
        })
    }

    closeSnackbar = () => {
        this.setState({
            snackbar: false
        });
    }
    
    // Shuffles the array prior to mounting
    componentWillMount() {
        const jsonToArray = this.props.data;
        this.arrayShuffle(jsonToArray);
    }
    
    // Function that shuffles the activities.
    arrayShuffle = (array) => {
        let m = array.length;
        let t;
        let i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        this.setState({
            data: array,
            loading: false,
        });
    }
    
    render() {
        // Shows a loading screen if the data has not been loaded yet.
        if (this.state.loading) {
            return (
                <div style={{ marginTop: '40vh', display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </div>
            );
        }

        const coords = this.props.coords;
        const data = this.state.data;

        return (
            <Grid container justify="center">
                <Grid item xs={12}>
                    <Swiper spaceBetween={15} loop={true}
                        on={{ slideChange: this.updateIndex }}
                        getSwiper={(swiper) => this.swiper = swiper} >
                        {data.map((card, index) => (
                            <div  key={card[0]}>
                                <QuestCard toggleSnackbar={this.toggleSnackbar} current={this.state.current} databaseQuestId={card[0]} coords={coords} questId={index + 1} questData={card[1]} globalUser={this.props.authUser} />
                            </div>
                        ))}
                    </Swiper>
                </Grid>
                <Snackbar ContentProps={{style: {background: '#66BB6A'}}} open={this.state.snackbar} 
                message={
                    <span style={{display: 'flex', alignItems: 'center'}}>
                        <CheckCircleIcon style={{marginRight: '8px'}} /> Quest added to Favourites!</span>} 
                autoHideDuration={3000} 
                action={<IconButton onClick={this.closeSnackbar}><CloseIcon style={{color: 'white'}} /></IconButton>} />
            </Grid>
        );
    }
}

export default QuestPage;