import React, { useState } from 'react';
import { ServiceContainer } from './components/serviceContainer';
import './index.scss';

const App = () => {
    const [done, setDone] = useState(false);
    return (
        <div className={`App ${!done ? 'viewHeight' : ''}`}>
            <ServiceContainer done={value => setDone(value)}/>
        </div>
    );
};

export default App;
