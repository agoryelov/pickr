import React, {Component} from 'react';
import Cell from './Cell';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Smiley from '../images/smiley.png';
import Frown from '../images/frowney.png';
import Face from '../images/mineface.png';
import Timer from './Timer';

/** This is the board layout for the minesweeper game. */
class Board extends Component {
    constructor(props){
        super(props);
        this.state = {  
          boardData: this.initBoardData(this.props.height, this.props.width, this. props.mines),
          gameStatus: "Game in Progress",
          mineCount: this.props.mines,
          face: Face,
          trigger: false,
          pause: false,
        };
        this.reset = this.reset.bind(this);
    } 

    // Creates the initial layout of the board.
    createEmptyArray = (height, width) => {
        let data = [];

        for (let i = 0; i < height; i++) {
            data.push([]);

            for(let j = 0; j < width; j++) {
                data[i][j] = {
                    x: i,
                    y: j,
                    isMine: false,
                    neighbour: 0,
                    isRevealed: false,
                    isEmpty: false,
                    isFlagged: false,
                };
            }
        }
        return data;
    }

    // Plants all of the mines in random places.
    plantMines = (data, height, width, mines) => {
        let randomx, randomy, minesPlanted = 0;

        while (minesPlanted < mines) {
            randomx = this.getRandomNumber(width);
            randomy = this.getRandomNumber(height);

            if(!(data[randomx][randomy].isMine)) {
                data[randomx][randomy].isMine = true;
                minesPlanted++;
            }
        }
        return (data);
    }

    // Gets the number of mines remaining.
    getMines = (data) => {
        let mineArray = [];

        data.map(datarow => {
            datarow.map((dataitem) => {
                if(dataitem.isMine) {
                    mineArray.push(dataitem);
                }
            });
        });

        return mineArray;
    }

    // Gets the number of flags that have been used.
    getFlags = (data) => {
        let mineArray = [];

        data.map(datarow => {
            datarow.map((dataitem) => {
                if(dataitem.isFlagged) {
                    mineArray.push(dataitem);
                }
            });
        });

        return mineArray;
    }

    // Gets the number of cells that are hidden.
    getHidden = (data) => {
        let mineArray = [];

        data.map(datarow => {
            datarow.map((dataitem) => {
                if(dataitem.isRevealed) {
                    mineArray.push(dataitem);
                }
            });
        });

        return mineArray;
    }
    
    getRandomNumber = (size) => {
        return Math.floor((Math.random() * 1000) + 1) % size;
    }

    // On click, this function opens up the neighboring cells if they have not been flagged/not a mine.
    getNeighbours = (data, height, width) => {
        let updatedData = data;

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if(data[i][j].isMine !== true) {
                    let mine = 0;
                    const area = this.traverseBoard(data[i][j].x, data[i][j].y, data);
                    area.map(value => {
                        if (value.isMine) {
                            mine++;
                        }
                    });
                    if (mine === 0) {
                        updatedData[i][j].isEmpty = true;
                    }
                    updatedData[i][j].neighbour = mine;
                }
            }
        }
        return (updatedData);
    }

    // Support method for opening the surrounding cells in the getNeighbours method.
    traverseBoard = (x, y, data) => {
        const el = [];

        if (x > 0) {
            el.push(data[x - 1][y]);
        }

        if (x < this.props.height - 1) {
            el.push(data[x + 1][y]);
        }

        if (y > 0) {
            el.push(data[x][y - 1]);
        }

        if (y < this.props.width - 1) {
            el.push(data[x][y + 1]);
        }

        if (x > 0 && y > 0) {
            el.push(data[x - 1][y - 1]);
        }

        if (x > 0 && y < this.props.width - 1) {
            el.push(data[x - 1][y + 1]);
        }

        if (x < this.props.height - 1 && y < this.props.width - 1) {
            el.push(data[x + 1][y + 1]);
        }

        if (x < this.props.height - 1 && y > 0) {
            el.push(data[x + 1][y - 1]);
        }

        return el;
    }

    // Grabs the data of the initial layout of the board.
    initBoardData = (height, width, mines) => {
        let data = this.createEmptyArray(height, width);
        data = this.plantMines(data, height, width, mines);
        data = this.getNeighbours(data, height, width);

        return data;
    }

    // Method for revealing the value of the cell.
    revealEmpty(x, y, data) {
        let area = this.traverseBoard(x, y, data);
        area.map(value => {
            if(!value.isFlagged && !value.isRevealed && (value.isEmpty || !value.isMine)) {
                data[value.x][value.y].isRevealed = true;
                if (value.isEmpty) {
                    this.revealEmpty(value.x, value.y, data);
                }
            }
        });
        return data;
    }

    // Method for revealing the entire board (done on loss).
    revealBoard = () => {
        let updatedData = this.state.boardData;
        updatedData.map((datarow) => {
            datarow.map((dataitem) => {
                dataitem.isRevealed = true;
            });
        });

        this.setState({
            boardData: updatedData,
        });
    }

    // Checks the state of the cell on a user's click.
    handleCellClick = (x, y) => {
        if(this.state.boardData[x][y].isRevealed || this.state.boardData[x][y].isFlagged) {
            return null;
        }

        if(this.state.boardData[x][y].isMine) {
            this.setState({
                gameStatus: "You Lose.",
                face: Frown,
                pause: true,
            });
            this.revealBoard();
        }

        let updatedData = this.state.boardData;
        updatedData[x][y].isFlagged = false;
        updatedData[x][y].isRevealed = true;

        if (updatedData[x][y].isEmpty) {
            updatedData = this.revealEmpty(x, y, updatedData);
        }

        if (this.getHidden(updatedData).length === this.props.mines) {
            this.setState({
                mineCount: 0,
                gameStatus: "You Win!",
                face: Smiley,
                trigger: true,
                pause: true,
            });

            this.revealBoard();
        }

        this.setState({
            boardData: updatedData,
            mineCount: this.props.mines - this.getFlags(updatedData).length,
            trigger: false,
        });
    }

    // Handles what happens with the data on a user's click.
    handleContextMenu = (e, x, y) => {
        e.preventDefault();
        let updatedData = this.state.boardData;
        let mines = this.state.mineCount;
        let win = false;

        if (updatedData[x][y].isRevealed) {
            return;
        }

        if (updatedData[x][y].isFlagged) {
            updatedData[x][y].isFlagged = false;
            mines++;
        } else {
            updatedData[x][y].isFlagged = true;
            mines--;
        }

        if (mines === 0) {
            const mineArray = this.getMines(updatedData);
            const FlagArray = this.getFlags(updatedData);
            if (JSON.stringify(mineArray) === JSON.stringify(FlagArray)) {
                this.revealBoard();
            }
        }
        this.setState({
            boardData: updatedData,
            mineCount: mines,
            gameWon: win,
        });
    }

    // Render the actual board with the cells.
    renderBoard = (data) => {
        return data.map((datarow) => {
            return datarow.map((dataitem) => {
                return (
                   
                    <div
                      key = {dataitem.x * datarow.length + dataitem.y}
                    >
                    <Cell
                      value = {{dataitem}}
                      onClick = {() => this.handleCellClick(dataitem.x, dataitem.y)}
                      cMenu = {(e) => this.handleContextMenu(e, dataitem.x, dataitem.y)}
                     
                    />
                    {(datarow[datarow.length - 1] === dataitem) ? <div className = "clear"/> : ""}
                    </div>

                );
            });
        });
    }

    // Whenever the window is resized, the board will be reset.
    componentWillReceiveProps(nextProps) {
        this.reset();
    }

    // Reset button.
    reset = () => {
        this.setState ({
          boardData: this.initBoardData(this.props.height, this.props.width, this.props.mines),
          gameStatus: "Game in Progress",
          mineCount: this.props.mines,
          face: Face,
          trigger: true,
          pause: false,
        });
    }

    render() {
        return(
            <div className = "board">
                <div className = "game-info">
                    <div className = "info">
                        Number of Mines: {this.state.mineCount}
                    </div>
                    <br />
                    <div className = "info">
                        {this.state.gameStatus}
                    </div>
                    <Timer trigger = {this.state.trigger} pause = {this.state.pause}/>
                    <div className = "info">
                    <img style = {{width: '50px'}}src = {this.state.face} alt = "mineFace"/>
                    </div>
                    <Button style = {{backgroundColor: "white", marginTop: '10px'}}onClick = {this.reset}> Reset</Button>
                    
                </div>
                {this.renderBoard(this.state.boardData)}
            </div>
  
            );
        }
    
}

Board.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    mines: PropTypes.number,
}

export default Board;