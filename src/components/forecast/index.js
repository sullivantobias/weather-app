import React from 'react';
import './index.scss';

export const ForeCast = ({ icon, temp, date, time }) => {
    const i = icon && `https://openweathermap.org/img/w/${icon}.png`;

    return (
        <>
            {icon && temp && date && time &&
                <div className="cmp-forecast">
                    <div className="cmp-forecast--date">{date}</div>
                    <div className="cmp-forecast--time">{time}</div>
                    <img className="cmp-forecast--icon" src={i}></img>
                    <div className="cmp-forecast--temp">{`${Number(temp).toFixed()}°`}</div>
                </div>
            }
        </>
    );
}
