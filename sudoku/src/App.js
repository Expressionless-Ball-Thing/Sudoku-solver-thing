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

  const updatehighlightcell = (key) => {
    let cellcount = Math.pow(grid.length,2)
    let newclickedcell
    if (key === "ArrowUp") {
      newclickedcell = (clickedcell - grid.length) % cellcount;
    } else if (key === "ArrowDown") {
      newclickedcell = (clickedcell + grid.length) % cellcount;
    } else if (key === "ArrowLeft") {
      newclickedcell = (clickedcell - 1) % cellcount;
    } else {
      newclickedcell = (clickedcell + 1) % cellcount;
    }
    newclickedcell = (newclickedcell < 0) ? cellcount + newclickedcell : newclickedcell

    setclickedcell(newclickedcell)
  }

  const deletecell = (key) => {
    let pos = parseInt(clickedcell)
    let row = Math.floor(pos/grid.length) 
    let col = pos % grid.length
    let temp_grid = [...grid]
    temp_grid[row][col] = null
    setgrid(temp_grid)
  }

  const handleKeyDown = (event) => {  
    let arrowkeys = ["ArrowRight", "ArrowUp", "ArrowDown", "ArrowLeft"]
    let deletekeys = ["Backspace", "Delete"]
    if (arrowkeys.includes(event.key) === true) {
      updatehighlightcell(event.key)
    } else if (deletekeys.includes(event.key)) {
      deletecell(event.key)
    } else {
      updatecell(event.key)
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });


  const updatecell = (value) => {
    value = parseInt(value)
    if (isNaN(value) || value === 0) {value = null}
    let pos = parseInt(clickedcell)
    let row = Math.floor(pos/grid.length) 
    let col = pos % grid.length
    let temp_grid = [...grid]
    temp_grid[row][col] = (value !== null && possible(row, col, value, grid)) ? value : temp_grid[row][col]
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
    var temp_grid = [...grid]
    for (let row = 0; row < temp_grid.length; row++) {
      for (let col = 0; col < temp_grid.length; col++) {
        temp_grid[row][col] = n;
      }
    }
    setgrid(temp_grid)
    setcompleted(false)
  }

  return (
    <div>
      <Grid grid={grid} click={highlightcell} clicked={clickedcell} complete={completed}/>
      <Buttons reset={reset} solve={solvesudoku}/>
    </div>
  );
}

export default App;
