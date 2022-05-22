import React from 'react';
import { possible } from '../sudoku';

function AllowedInputs(props) {

    const handleclick = (event) => {
        console.log(event.target.id)
        props.update(event.target.id)
    }

    let pos = parseInt(props.cell);
    let row = Math.floor(pos / props.grid.length);
    let col = pos % props.grid.length;
    let numbers = [...Array(props.grid.length + 1).keys()].slice(1)
    numbers = numbers.filter((num) => possible(row, col, num, props.grid))
    numbers = numbers.map((num) => <div className='allowednumber' id={num} onClick={handleclick}>{num}</div>)
    return (
        <div className='allowedinputs'>
            {numbers}
            {!props.completed && <div className='allowednumber' onClick={props.delete}></div>}
        </div>
    )
}

export default AllowedInputs