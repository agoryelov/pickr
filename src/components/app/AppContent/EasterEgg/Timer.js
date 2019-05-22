import React, {Component} from 'react';

var times = 0;

/** This component is a timer for the game and keeps track of the user's finish time. */
class Timer extends Component {
    constructor(props){
        super(props);
        this.state = {
            time: times,
            pause: false,
        }
        // Bind the tick function to be used in the component.
        this.tick = this.tick.bind(this);
    }
    
    /** This function continues the timer and sets it at 999 if more than 999
     * and stops the timer if the player has won or lost the game. */ 
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

    /** The tick function is operating every second. */
    componentDidMount() {
        this.setState({
            time: setInterval(this.tick, 1000),
        });
    }

    /** Reset the timer when the user leaves the page. */
    componentWillUnmount() {
        times = 0;
    }

    /** Reset the timer on click of button. */
    reset() {
        times = 0;
        this.setState({
            time: times,
        });
    }

    /** If the user loses or wins, the timer is paused. If the reset button has been clicked,
     * the timer will also reset.
    */
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