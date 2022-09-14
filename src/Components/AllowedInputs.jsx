import React from 'react';
import { possible } from '../sudoku';

function AllowedInputs(props) {
    let grid = [...props.grid]
    const handleclick = (event) => {
        props.update(event.target.id)
    }

    let pos = parseInt(props.cell);
    let row = Math.floor(pos / grid.length);
    let col = pos % grid.length;
    if (typeof grid[row][col] === "string") {
        return
    }
    let numbers = [...Array(grid.length + 1).keys()].slice(1)
    numbers = props.mode ? numbers : numbers.filter((num) => possible(row, col, num, grid));
    numbers = numbers.map((num) => <div className='allowednumber' key={num} id={num} onClick={handleclick}>{num}</div>)
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