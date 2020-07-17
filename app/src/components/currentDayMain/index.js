import React from 'react';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CurrentDayMain = ({ icon, temp, desc, className }) => {
    return (
        <>
        {icon && temp && desc &&
            <div className={`cmp-currentDayMain ${className}`}>
                <div className="cmp-currentDayMain--title">Today</div>
                <FontAwesomeIcon className="cmp-currentDayMain--icon" icon={ icon }/>
                <div className="cmp-currentDayMain--deg">{ `${Number(temp).toFixed()}°` }</div>
                <div className="cmp-currentDayMain--desc">{ desc }</div>
            </div>
        }
        </>
    );
}
