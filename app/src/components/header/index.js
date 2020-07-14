import React from 'react';
import './index.scss';

export const Header = ({ city, date }) => {
    return (
        <div className="cmp-header">
            <h1>{ city }</h1>
            <h3>{ date }</h3>
        </div>
    );
}
