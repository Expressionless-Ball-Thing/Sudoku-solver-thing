import "./App.css";
import React, { useState } from "react";
import Buttons from "./Components/Buttons";
import Grid from "./Components/Grid";
import {possible} from "./sudoku.js"
import {solver, solved} from "./solver.js"

const n = null

function App() {
  const [grid, setgrid] = useState([
    [n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n],
  ]);
  const [clickedcell, setclickedcell] = useState(0);
  const [completed, setcompleted] = useState(false);

  const updatecell = (event) => {
    var value = parseInt(event.target.value)
    if (isNaN(value)) {value = null}
    var pos = parseInt(event.target.id) 
    /* var value = parseInt(event.key)
    var pos = parseInt(clickedcell) */
    var row = Math.floor(pos/grid.length) 
    var col = pos % grid.length
    var temp_grid = [...grid]

    if (value !== null && possible(row, col, value, grid)) {
      temp_grid[row][col] = value
    } else {
      temp_grid[row][col] = null
    }
    setgrid(temp_grid)
    if (solved(temp_grid)) {
      setcompleted(true)
    }
  }

  const solvesudoku = () => {
    var temp_grid = solver(grid)
    if (temp_grid !== false) {
      setgrid(temp_grid)
      setcompleted(true)
    } else {
      setcompleted("unsolvable")
    }
  }

  const highlightcell = (event) => {
    var pos = parseInt(event.target.id)
    setclickedcell(pos)
  }

  const reset = () => {
    setgrid([
      [n, n, n, n, n, n, n, n, n],
      [n, n, n, n, n, n, n, n, n],
      [n, n, n, n, n, n, n, n, n],
      [n, n, n, n, n, n, n, n, n],
      [n, n, n, n, n, n, n, n, n],
      [n, n, n, n, n, n, n, n, n],
      [n, n, n, n, n, n, n, n, n],
      [n, n, n, n, n, n, n, n, n],
      [n, n, n, n, n, n, n, n, n],
    ])
    setcompleted(false)
  }

  return (
    <div>
      <Grid grid={grid} update={updatecell} click={highlightcell} clicked={clickedcell} complete={completed}/>
      <Buttons reset={reset} solve={solvesudoku}/>
    </div>
  );
}

export default App;
