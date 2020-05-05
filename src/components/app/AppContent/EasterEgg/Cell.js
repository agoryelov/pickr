import React, {Component} from 'react';
import PropTypes from 'prop-types';

/** This is the cell component that is inserted into the Board. */
class Cell extends Component {
    // On a user's click, the cell will be updated with a flag, bomb, or number.
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

// Sets the types of properties that must be passed to the Cell component.
Cell.propTypes = {
    value: PropTypes.objectOf(PropTypes.shape(cellItemShape)),
    onClick: PropTypes.func,
    cMenu: PropTypes.func,
}


export default Cell;