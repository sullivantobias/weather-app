import React from 'react';
import './index.scss';

export const Header = ({ city, date, className }) => {
    return (
        <div className={`cmp-header ${className}`}>
            <h1>{ city }</h1>
            <h3>{ date }</h3>
        </div>
    );
}
