import React from 'react';
import { possible } from '../sudoku';

function AllowedInputs(props) {
    let pos = parseInt(props.cell);
    let row = Math.floor(pos / props.grid.length);
    let col = pos % props.grid.length;
    let numbers = [...Array(props.grid.length + 1).keys()].slice(1)
    numbers = numbers.filter((num) => possible(row, col, num, props.grid))
    numbers = numbers.map((num) => <div className='allowednumber'>{num}</div>)
    return (
        <div className='allowedinputs'>
            {numbers}
        </div>
    )
}

export default AllowedInputs