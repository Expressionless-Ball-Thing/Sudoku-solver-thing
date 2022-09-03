import React from 'react';

const Message = ({mode}) => {
    let message = "insert mode";
    if (mode === true) {
        message = "note mode"
    }
    return (
        <p>
            You are currently in {message}.
        </p>
    )
}

export default Message;