import React from "react";
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Firebase from '../firebase'

import '../CSS/QuestPage.css'

import QuestCard from '../Layout/QuestCard/QuestCard';
import * as ROUTES from '../../constants/routes';

class QuestPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
            loading: true,
            current: 1,
            userCoords: null,
            virtualData: null,
            globaUser: null
        };
        
        this.swiper = null;
    }
    
    updateIndex = () => {
        if (this.swiper != null) {
            this.setState({ current: this.swiper.activeIndex });
        }
    }
    
    componentDidMount() {
        const jsonToArray = Object.entries(this.props.data);
        this.arrayShuffle(jsonToArray);
    }
    
    arrayShuffle = (array) => {
        let m = array.length;
        let t;
        let i;
        console.log("Randomizing");
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
        if (this.state.loading) {
            return (
                <div style={{ marginTop: '40vh', display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </div>
            );
        }

        const coords = this.props.coords;
        const data = this.state.data;
        console.log(this.state.current);
        console.log(this.state.data);

        return (
            <Grid container justify="center" style={{}}>
                <Grid item xs={12}>
                    <Swiper spaceBetween={15} loop={true}
                        on={{ slideChange: this.updateIndex }}
                        getSwiper={(swiper) => this.swiper = swiper} >
                        {data.map((card, index) => (
                            <div key={card[0]}>
                                <QuestCard current={this.state.current} coords={coords} questId={card[0]} questData={card[1]} globalUser={this.props.authUser} />
                            </div>
                        ))}
                    </Swiper>
                </Grid>
            </Grid>
        );
    }
}

export default QuestPage;