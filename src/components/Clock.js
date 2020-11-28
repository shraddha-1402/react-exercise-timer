import React from 'react';
import '../App.css';

const Clock = ({
    cssClass,
    displayMins,
    displaySecs
}) => {
    return (
        <div className={cssClass}>
            {displayMins} : {displaySecs}
        </div>
    )
}

export default Clock;