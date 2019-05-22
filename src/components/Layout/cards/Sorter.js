import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Sorter extends Component {
    constructor(props){
        super(props);
        this.state = {
            unsorted: props.arr,
            sorted: [props.arr.length],
            proximity: props.prox,
        };

    }

    propTypes = {
        unsorted: PropTypes.array,
    }

    distFilter = () => {
        var unfiltArr = this.bubblesort();
        console.log(unfiltArr);
        var found = false;
        var filtArr;
        var arrLength = unfiltArr.length;
        console.log(arrLength);
        var currIndex = Math.floor(arrLength / 2);
        console.log(currIndex)
        /* uses a binary search initially to filter out anything above the proximity */
        while(!found) {
  
            if(unfiltArr[currIndex] == this.state.proximity) {
                found = true;
                filtArr = unfiltArr.slice(0, currIndex + 1);
                console.log(filtArr);
            } else {
                if(unfiltArr[currIndex] > this.state.prox) {
                    currIndex--;
                } else {
                    currIndex++;
                }
            }

    
        }
        return filtArr;
    
    }

    bubblesort = () => {
        var extraArr = this.state.unsorted;
        var temp;
        var switched = true;
        var innercount;
        while(switched) {
            switched = false;
            for(let i = 0; i < extraArr.length - 1; i++) {
                innercount = i;
                while(extraArr[innercount] > extraArr[innercount + 1]) {
                    temp = extraArr[innercount];
                    extraArr[innercount] = extraArr[innercount + 1];
                    extraArr[innercount + 1] = temp;
                    innercount++;
                    switched = true;
                }
            }
        }
        return extraArr;
    }

    render() {
        return(
            <div>
                {this.distFilter()}
            </div>
        );
    }
}

export default Sorter;