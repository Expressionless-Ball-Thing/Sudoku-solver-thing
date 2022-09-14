import "./App.css";
import React, { useState } from "react";
import Buttons from "./Components/Buttons";
import Grid from "./Components/Grid";
import { possible } from "./sudoku.js";
import { solver, solved } from "./solver.js";
import AllowedInputs from "./Components/AllowedInputs";
import template from "./template.json";
import Message from "./Components/Message";

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
  const [templateloaded, settemplateloaded] = useState(false);
  const [completed, setcompleted] = useState(false);
  const [notemode, setnotemode] = useState(false);



  const updateclicked = (key) => {
    let cellcount = Math.pow(grid.length, 2);
    let newclickedcell;
    if (key === "ArrowUp") {
      newclickedcell = clickedcell - grid.length;
      newclickedcell =
        newclickedcell < 0
          ? cellcount + (newclickedcell % grid.length) - 1
          : newclickedcell;
    } else if (key === "ArrowDown") {
      newclickedcell = clickedcell + grid.length;
      newclickedcell =
        newclickedcell >= cellcount
          ? ((newclickedcell % cellcount) + 1) % grid.length
          : newclickedcell;
    } else if (key === "ArrowLeft") {
      newclickedcell = (clickedcell - 1) % cellcount;
    } else {
      newclickedcell = (clickedcell + 1) % cellcount;
    }
    newclickedcell =
      newclickedcell < 0 ? cellcount + newclickedcell : newclickedcell;
    setclickedcell(newclickedcell);
  };

  const deletecell = () => {
    let pos = parseInt(clickedcell);
    let row = Math.floor(pos / grid.length);
    let col = pos % grid.length;
    let temp_grid = [...grid];
    temp_grid[row][col] =
      typeof temp_grid[row][col] === "string" ? temp_grid[row][col] : null;
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
    } else if (event.key === "n") {
      changemode();
    } else {
      updatecell(event.key);
    }
  };

  const changemode = () => {
    notemode === true ? setnotemode(false) : setnotemode(true);
  }

  const updatecell = (num) => {
    num = parseInt(num);
    if (isNaN(num) || num === 0) {
      return;
    }
    let pos = parseInt(clickedcell);
    let row = Math.floor(pos / grid.length);
    let col = pos % grid.length;
    let temp_grid = [...grid];

    if (typeof temp_grid[row][col] === "string") return;

    if (notemode) {
      temp_grid[row][col] = Array.isArray(temp_grid[row][col])
        ? temp_grid[row][col]
        : [n, n, n, n, n, n, n, n, n];
      temp_grid[row][col][num - 1] = num;
    } else {
      temp_grid[row][col] = 
        possible(row, col, num, grid)
          ? num
          : temp_grid[row][col];
    }

    setgrid(temp_grid);
    if (solved(temp_grid)) {
      setcompleted(true);
    }
  };

  const solvesudoku = () => {
    if (solved(grid)) {
      return;
    }
    let temp_grid = [...grid];

    for (let row = 0; row < temp_grid.length; row++) {
      temp_grid[row] = temp_grid[row].map((num) => {
        return Array.isArray(num)
          ? n
          : num
      });
    }

    if (templateloaded) {
      for (let row = 0; row < temp_grid.length; row++) {
        temp_grid[row] = temp_grid[row].map((num) => {
          return typeof num === "number"
            ? n
            : typeof num === "string"
            ? parseInt(num)
            : num;
        });
      }
    }
    temp_grid = solver(temp_grid);
    if (temp_grid !== false) {
      setgrid(temp_grid);
      setcompleted(true);
    } else {
      setcompleted("unsolvable");
    }
  };

  const clearinputs = () => {
    let string = templateloaded;
    let temp_grid = [...grid];
    for (let row = 0; row < temp_grid.length; row++) {
      for (let col = 0; col < temp_grid.length; col++) {
        let stuff2 = row * grid.length + col;
        temp_grid[row][col] = string[stuff2] === "." ? n : string[stuff2];
      }
    }
    setgrid(temp_grid);
    setcompleted(false);
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
    settemplateloaded(false);
    setgrid(temp_grid);
    setcompleted(false);
  };

  const random = () => {
    reset();
    let stuff = template.easy;
    let string =
      stuff[Math.floor(Math.random() * (stuff.length - 1))].split("");
    let temp_grid = [...grid];
    for (let row = 0; row < temp_grid.length; row++) {
      for (let col = 0; col < temp_grid.length; col++) {
        let stuff2 = row * grid.length + col;
        temp_grid[row][col] = string[stuff2] === "." ? n : string[stuff2];
      }
    }
    settemplateloaded(string);
    setgrid(temp_grid);
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div>
      <Message complete={completed} mode={notemode} switch={changemode}/>
      <Grid
        grid={grid}
        click={highlightclickedcell}
        clicked={clickedcell}
        complete={completed}
        switch={changemode}
        mode={notemode}
      />
      <AllowedInputs
        grid={grid}
        cell={clickedcell}
        mode={notemode}
        completed={completed}
        update={updatecell}
        delete={deletecell}
      />
      <Buttons
        reset={reset}
        solve={solvesudoku}
        random={random}
        clearinputs={clearinputs}
        completed={completed}
        template={templateloaded}
        mode={notemode}
      />
    </div>
  );
}

export default App;
