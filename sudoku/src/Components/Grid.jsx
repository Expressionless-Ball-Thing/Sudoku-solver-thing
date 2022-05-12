import React from 'react';

function Grid(props) {
    const items = []
    for (let row = 0; row < props.grid.length; row++) {
        for (let col = 0; col < props.grid.length; col++) {
            let stuff = row * props.grid.length + col
            var classset = 'cell'
            if (stuff === props.clicked) {
                classset = 'cell clicked'
            }
            if (props.complete === true) {
                items.push(<input 
                    key={stuff}
                    readOnly
                    className='cell solved' 
                    id={stuff} 
                    value={props.grid[row][col]}/>)
            } else {
                items.push(<input 
                    key={stuff}
                    maxLength={1} 
                    onClick={props.click} 
                    onChange={props.update} 
                    className={classset} 
                    id={stuff} 
                    value={props.grid[row][col] === null ? "" : props.grid[row][col]}/>
                )
            }
        }
    }

    const completion = (props.complete === "unsolvable") ? "This thing isn't solvable" : (props.complete === true) ? "Solved" : ""

    return (
        <div>
            <div className='Message'>
                <h1>{completion}</h1>
            </div>
            
            <div className='Gridspace'>
                {items}
            </div>
        </div>  
    )
}

export default Grid;