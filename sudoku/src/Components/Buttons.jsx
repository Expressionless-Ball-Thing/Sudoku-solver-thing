import React from 'react';

function Buttons(props) {
    return (
        <div>
            <div>
                <button className="button reset" onClick={props.reset}>Reset Grid</button>
            </div>

            <div>
                <button className="button solve" onClick={props.solve}>Solve</button>
            </div>

            <div>
                <button className="button random" onClick={props.random}>Random</button>
            </div>

        </div>
    )
}

export default Buttons;