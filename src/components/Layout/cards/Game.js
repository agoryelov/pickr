import React, {Component} from 'react';
import Board from './Board';
import './games.scss';

/** This is a simple minesweeper game as a part of our Easter Egg/Surprise
 * challenge.
 */

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            height: 10,
            width: 10,
            mines: 20,
        };
        // Bind this function to ensure the game is resizing with the window.
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    // Function to grab the initial dimensions of the game.
    updateWindowDimensions() {
        this.setState({
            width: Math.floor(window.innerWidth/100),
            height: Math.floor(window.innerWidth/100),
            mines: Math.floor(window.innerWidth/100 * window.innerWidth/100 / 5),
        });
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    // Get the current window dimensions before rendering.
    componentWillMount() {
        this.updateWindowDimensions();
    }

    // When the game is no longer mounted on the page, the resizing funciton is disabled
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }
    
    render() {
        return (
            <div id = "game">
                <Board height = {this.state.height} width = {this.state.width} mines = {this.state.mines} className = "board"/>
            </div>
        );
    }
}

export default Game;