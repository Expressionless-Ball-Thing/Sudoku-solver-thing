import "./App.css";
import React, { useState } from "react";
import Buttons from "./Components/Buttons";
import Grid from "./Components/Grid";
import {solve, possible} from "./sudoku.js"

function App() {
  const [grid, setgrid] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [clickedcell, setclickedcell] = useState(0)

  const updatecell = (event) => {
    var value = parseInt(event.target.value)
    if (isNaN(value)) {value = null}
    var pos = parseInt(event.target.id)
    var row = Math.floor(pos/grid.length)
    var col = pos % grid.length

    if (value !== 0 && possible(row, col, value, grid)) {
      grid[row][col] = value
    } else {
      grid[row][col] = 0
    }
    setgrid(grid)
  }

  const solvesudoku = () => {
    var temp_grid = solve(grid)
    setgrid(temp_grid)
  }

  const highlightcell = (event) => {
    console.log(event.target.id)
    var pos = parseInt(event.target.id)
    setclickedcell(pos)
  }

  const reset = () => {
    setgrid([
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],   
    ])
  }

  return (
    <div>
      <Grid grid={grid} update={updatecell} click={highlightcell} clicked={clickedcell}/>
      <div className="ButtonSpace">
        <Buttons reset={reset} solve={solvesudoku}/>
      </div>
    </div>
  );
}

export default App;
