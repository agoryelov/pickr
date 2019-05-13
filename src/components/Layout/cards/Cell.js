import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Cell extends Component {
    constructor(props) {
        super(props);
    }

    getValue = () => {
        const {value} = this.props;

        if (!value.dataitem.isRevealed) {
            return value.dataitem.isFlagged ? "🚩" : null;
        }
        if (value.dataitem.isMine) {
            return "💣";
        }
        if (value.dataitem.neighbour === 0) {
            return null;
        }
        return value.dataitem.neighbour;
    }
    render() {
        const { value, onClick, cMenu} = this.props;
        let className = "cell" + (value.dataitem.isRevealed ? "": " hidden") + (value.dataitem.isMine ? " is-mine" : "") + (value.dataitem.isFlagged ? " is-flag" : "");
        console.log(value); 
        return(
            <div 
            onClick = {onClick}
            className = {className}
            onContextMenu = {cMenu}
            > 
            {this.getValue()}
            </div>
        );
    }
}

const cellItemShape = {
    isRevealed: PropTypes.bool,
    isMine: PropTypes.bool, 
    isFlagged: PropTypes.bool,
}

Cell.propTypes = {
    value: PropTypes.objectOf(PropTypes.shape(cellItemShape)),
    onClick: PropTypes.func,
    cMenu: PropTypes.func,
}


export default Cell;