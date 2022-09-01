import React from "react";

function Note(props) {
    console.log(props.data)
    const items = [];
    for (let i = 0; i < props.data.length; i++) {
        items.push(
            <div
                className="note"
                readOnly
                key={i}
                tabIndex="-1"
                maxLength={1}
                value={props.data[i] === null ? "" : props.data[i]}
            />
        )
    }
    return (
        <div className={props.classes}>
            {items}
        </div>
    )
}

export default Note;