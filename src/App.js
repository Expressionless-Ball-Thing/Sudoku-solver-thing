import "./App.css";
import React, { useState } from "react";
import Buttons from "./Components/Buttons";
import Grid from "./Components/Grid";
import { possible } from "./sudoku.js";
import { solver, solved } from "./solver.js";
import AllowedInputs from "./Components/AllowedInputs";
import template from "./template.json"


const n = null;

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
  const [templateloaded, settemplateloaded] = useState(false)
  const [completed, setcompleted] = useState(false);

  const updateclicked = (key) => {
    if (completed) {
      return;
    }
    let cellcount = Math.pow(grid.length, 2);
    let newclickedcell;
    if (key === "ArrowUp") {
      newclickedcell = clickedcell - grid.length;
      newclickedcell = newclickedcell < 0 ? cellcount + (newclickedcell % grid.length) - 1 : newclickedcell;
    } else if (key === "ArrowDown") {
      newclickedcell = clickedcell + grid.length;
      newclickedcell = newclickedcell >= cellcount ? ((newclickedcell % cellcount) + 1) % grid.length : newclickedcell;
    } else if (key === "ArrowLeft") {
      newclickedcell = (clickedcell - 1) % cellcount;
    } else {
      newclickedcell = (clickedcell + 1) % cellcount;
    }
    newclickedcell = newclickedcell < 0 ? cellcount + newclickedcell : newclickedcell;
    setclickedcell(newclickedcell);
  };

  const deletecell = () => {
    let pos = parseInt(clickedcell);
    let row = Math.floor(pos / grid.length);
    let col = pos % grid.length;
    let temp_grid = [...grid];
    temp_grid[row][col] = (typeof temp_grid[row][col] === 'string') ? temp_grid[row][col] : null;
    setgrid(temp_grid);
  };

  const handleKeyDown = (event) => {
    event.preventDefault();
    let arrowkeys = ["ArrowRight", "ArrowUp", "ArrowDown", "ArrowLeft"];
    let deletekeys = ["Backspace", "Delete"];
    if (arrowkeys.includes(event.key) === true) {
      updateclicked(event.key);
    } else if (deletekeys.includes(event.key)) {
      deletecell();
    } else {
      updatecell(event.key);
    }
  };

  const updatecell = (value) => {
    value = parseInt(value);
    if (isNaN(value) || value === 0) {
      value = null;
    }
    let pos = parseInt(clickedcell);
    let row = Math.floor(pos / grid.length);
    let col = pos % grid.length;
    let temp_grid = [...grid];
    temp_grid[row][col] = value !== null && typeof temp_grid[row][col] !== "string" && possible(row, col, value, grid) ? value : temp_grid[row][col];
    setgrid(temp_grid);
    if (solved(temp_grid)) {
      setcompleted(true);
    }
  };

  const solvesudoku = () => {
    let temp_grid = [...grid]
    console.log(grid)
    if (templateloaded === true) {
      for (let row = 0; row < temp_grid.length; row++) {
        temp_grid[row] = temp_grid[row].map(num => {return (typeof num === "number") ? n : num})
      }
    }
    console.log(temp_grid)
    temp_grid = solver(temp_grid);
    if (temp_grid !== false) {
      setgrid(temp_grid);
      setcompleted(true);
    } else {
      setcompleted("unsolvable");
    }
  };

  const highlightclickedcell = (event) => {
    var pos = parseInt(event.target.id);
    setclickedcell(pos);
  };

  const reset = () => {
    let temp_grid = [...grid];
    for (let row = 0; row < temp_grid.length; row++) {
      for (let col = 0; col < temp_grid.length; col++) {
        temp_grid[row][col] = n;
      }
    }
    settemplateloaded(false)
    setgrid(temp_grid);
    setcompleted(false);
  };

  const random = () => {
    reset()
    let stuff = template.easy
    let string = stuff[Math.floor(Math.random() * (stuff.length - 1))].split('')
    let temp_grid = [...grid]
    for (let row = 0; row < temp_grid.length; row++) {
      for (let col = 0; col < temp_grid.length; col++) {
        let stuff2 = row * grid.length + col;
        temp_grid[row][col] = (string[stuff2] === ".") ? n : string[stuff2];
      }
    }
    settemplateloaded(true)
    setgrid(temp_grid)
  }


  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });




  return (
    <div>
      <Grid
        grid={grid}
        click={highlightclickedcell}
        clicked={clickedcell}
        complete={completed}
      />
      <AllowedInputs
        grid={grid}
        cell={clickedcell}
        completed={completed}
        update={updatecell}
        delete={deletecell}
      />
      <Buttons reset={reset} solve={solvesudoku} random={random} completed={completed}/>
    </div>
  );
}

export default App;
