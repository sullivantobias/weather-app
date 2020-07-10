import React, { useEffect, useState } from 'react';
import { Header } from '../header';

export const ServiceContainer = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState({});

    useEffect(() => {
        const APIkey = process.env.REACT_APP_API_KEY;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&appid=${APIkey}`)
            .then(res => res.json())
            .then(
                result => {
                    setIsLoaded(true);
                    const date = setDate(result.dt)
                    const infos = {
                        name: result.name,
                        date: date
                    }
                    setItem(infos)
                },
                error => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const setDate = (ts) => {
        const date = new Date(ts * 1000);

        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'Nocvember',
            'December',
        ];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const newDate = `${days[date.getDay()]} ${date.getDate()} ${
            months[date.getMonth()]
            }`;

        return newDate;
    }

    return (
        <div className="cmp-service-container">
            <Header city={item.name} date={item.date}/>
        </div>
    );
}
