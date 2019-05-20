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
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    updateWindowDimensions() {
        this.setState({
            width: Math.floor(window.innerWidth/85),
            height: Math.floor(window.innerWidth/85),
        });
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillMount() {
        this.updateWindowDimensions();
    }

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