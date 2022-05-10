import React from 'react';

function Grid(props) {
    const items = []
    for (let row = 0; row < props.grid.length; row++) {
        for (let col = 0; col < props.grid.length; col++) {
            var stuff = row * props.grid.length + col
            items.push(<input type="number" min="1" max="9" className='cell' id={stuff}/>)
        }
    }
    return (
        <div className='Gridspace'>
            {items}
        </div>
    )
}

export default Grid;