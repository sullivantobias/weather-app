import React from 'react';
import './index.scss';

export const CurrentDayAdvanced = ({ high, wind, humidity, sunrise, sunset }) => {
    return (
        <div className="cmp-currentDayAdvanced">
            <div className="cmp-currentDayAdvanced--high item"><span>Hight</span> { high.toFixed() }°</div>
            <div className="cmp-currentDayAdvanced--wind item"><span>Wind</span>{ wind }mph</div>
            <div className="cmp-currentDayAdvanced--rain item"><span>Humidity</span>{ humidity }%</div>
            <div className="cmp-currentDayAdvanced--sunrise item"><span>Sunrise</span>{ sunrise }</div>
            <div className="cmp-currentDayAdvanced--sunset item"><span>Sunset</span>{ sunset }</div>
        </div>
    );
}
