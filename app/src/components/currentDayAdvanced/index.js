import React from 'react';

export const CurrentDayAdvanced = ({ high, low, wind, humidity, sunrise, sunset }) => {
    return (
        <div className="cmp-currentDayAdvanced">
            <div className="cmp-currentDayAdvanced--high">{ high }</div>
            <div className="cmp-currentDayAdvanced--low">{ low }</div>
            <div className="cmp-currentDayAdvanced--wind">{ wind }</div>
            <div className="cmp-currentDayAdvanced--rain">{ humidity }</div>
            <div className="cmp-currentDayAdvanced--sunrise">{ sunrise }</div>
            <div className="cmp-currentDayAdvanced--sunset">{ sunset }</div>
        </div>
    );
}
