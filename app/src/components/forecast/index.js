import React from 'react';

export const ForeCast = ({ icon, temp, date, time }) => {
    const i = `https://openweathermap.org/img/w/${icon}.png`;

    return (
        <div className="cmp-forecast">
            <img className="cmp-forecast--icon" src={ i }></img>
    <div className="cmp-forecast--temp">{ `${Number(temp).toFixed()}°` }</div>
            <div className="cmp-forecast--date">{ date }</div>
            <div className="cmp-forecast--time">{ time }</div>
        </div>
    );
}
