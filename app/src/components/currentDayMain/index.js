import React from 'react';

export const CurrentDayMain = ({ icon, temp, desc }) => {
    const i = `https://openweathermap.org/img/w/${icon}.png`;

    return (
        <div className="cmp-currentDayMain">
            <img className="cmp-currentDayMain--icon" src={ i }></img>
    <div className="cmp-currentDayMain--deg">{ `${Number(temp).toFixed()}°` }</div>
            <div className="cmp-currentDayMain--desc">{ desc }</div>
        </div>
    );
}
