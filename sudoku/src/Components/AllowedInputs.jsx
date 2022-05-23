import React from 'react';
import { possible } from '../sudoku';

function AllowedInputs(props) {

    const handleclick = (event) => {
        props.update(event.target.id)
    }

    let pos = parseInt(props.cell);
    let row = Math.floor(pos / props.grid.length);
    let col = pos % props.grid.length;
    if (typeof props.grid[row][col] !== 'number' && props.grid[row][col] !== null) {
        return
    }
    let numbers = [...Array(props.grid.length + 1).keys()].slice(1)
    numbers = numbers.filter((num) => possible(row, col, num, props.grid))
    numbers = numbers.map((num) => <div className='allowednumber' id={num} onClick={handleclick}>{num}</div>)
    return (
        <div>
        {!props.completed && <div className='allowedinputs'>
            {numbers}
            <div className='allowednumber' onClick={props.delete}>Erase</div>
        </div>}
        </div>
    )
}

export default AllowedInputs