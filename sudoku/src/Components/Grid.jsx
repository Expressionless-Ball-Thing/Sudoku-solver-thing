import React from 'react';

function Grid(props) {
    console.log(props.grid)
    const items = []
    for (let row = 0; row < props.grid.length; row++) {
        for (let col = 0; col < props.grid.length; col++) {
            let stuff = row * props.grid.length + col
            var classset = 'cell'
            if (stuff === props.clicked) {
                classset = 'cell clicked'
            }
            items.push(<input 
                maxLength={1} 
                onClick={props.click} 
                onChange={props.update} 
                className={classset} 
                id={stuff} 
                value={props.grid[row][col] === 0 ? "" : props.grid[row][col]}/>
            )
        }
    }

    return (
        <div className='Gridspace'>
            {items}
        </div>
    )
}

export default Grid;