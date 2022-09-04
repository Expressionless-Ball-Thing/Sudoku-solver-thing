import React from 'react';

const Message = (props) => {
    let message = "insert mode";
    if (props.mode === true) {
        message = "note mode"
    }
    return (
        <div className="mode">
            <p>
                You are currently in {message}.
            </p>
            <button className="button switch" onClick={props.switch}>Switch Mode</button>
        </div>
    )
}

export default Message;