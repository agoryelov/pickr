import React, {Component} from 'react';
import Board from './Board';
import './games.scss';

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            height: 10,
            width: 10,
            mines: 20,
        };
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