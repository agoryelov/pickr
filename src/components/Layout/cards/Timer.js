import React, {Component} from 'react';

var times = 0;
class Timer extends Component {
    constructor(props){
        super(props);
        this.state = {
            time: times,
            pause: false,
        }
        this.tick = this.tick.bind(this);
    }
    
    tick() {
        if(times < 999 && !this.state.pause) {
            times++;
        } else {
            if(this.state.pause) {
                times = times;
            } else {
                times = 999;
            }
        }
        this.setState({
            time: times,
        });
    }

    componentDidMount() {
        this.setState({
            time: setInterval(this.tick, 1000),
        });
    }

    componentWillUnmount() {
        times = 0;
    }

    reset() {
        times = 0;
        this.setState({
            time: times,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            pause: nextProps.pause,
        });
        if(nextProps.trigger){
            this.reset();
        } else{
            return;
        }
    }

    render() {
        return(
            <div>
                <p>{this.state.time}</p>
            </div>
        )
    }
}

export default Timer;