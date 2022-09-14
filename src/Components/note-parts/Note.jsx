import React from "react";

function Note(props) {
    const items = [];
    for (let i = 0; i < props.data.length; i++) {
        let classes = "note"
        classes += props.classes.includes("clicked") ? " clicked" : ""
        items.push(
            <div
                className={classes}
                key={i}
                id={props.id}
                tabIndex="-1"
                maxLength={1}
                onClick={props.click}
            >
            {props.data[i] === null ? "" : props.data[i]}
            </div>
        )
    }
    return (
        <div className={props.classes} id={props.id}>
            {items}
        </div>
    )
}

export default Note;