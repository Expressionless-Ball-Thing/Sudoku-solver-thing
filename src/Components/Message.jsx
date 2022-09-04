import React from "react";
import Mode from "./note-parts/Mode"

function Message(props) {
  const completion =
    props.complete === "unsolvable"
      ? "This thing isn't solvable"
      : props.complete === true
      ? "Solved"
      : "Get solvin!";

  return (
    <div className="Message">
      <h1>{completion}</h1>
      {props.complete === false ? <Mode mode={props.mode} switch={props.switch} /> : ""}
    </div>
  );
}

export default Message
