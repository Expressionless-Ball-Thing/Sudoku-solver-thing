import React from "react";

function Grid(props) {
  const rowitems = [];
  for (let row = 0; row < props.grid.length; row++) {
    const colitems = [];
    for (let col = 0; col < props.grid.length; col++) {
      let stuff = row * props.grid.length + col;
      let classes = "cell";
      classes += stuff === props.clicked ? " clicked" : "";
      classes += typeof props.grid[row][col] === "string" ? " preset" : "";

      if (props.complete === true) {
        colitems.push(
          <input
            key={stuff}
            disabled
            className="cell solved"
            id={stuff}
            value={props.grid[row][col]}
            tabIndex="-1"
          />
        );
      } else {
        colitems.push(
          <input
            readOnly
            key={stuff}
            tabIndex="-1"
            maxLength={1}
            onClick={props.click}
            className={classes}
            id={stuff}
            value={props.grid[row][col] === null ? "" : props.grid[row][col]}
          />
        );
      }
    }
    rowitems.push(colitems);
  }

  const gridlist = rowitems.map((cols) => <div className="row">{cols}</div>);
  const completion =
    props.complete === "unsolvable"
      ? "This thing isn't solvable"
      : props.complete === true
      ? "Solved"
      : "Get solvin!";

  return (
    <div>
      <div className="Message">
        <h1>{completion}</h1>
      </div>

      <div className="Gridspace">{gridlist}</div>
    </div>
  );
}

export default Grid;
