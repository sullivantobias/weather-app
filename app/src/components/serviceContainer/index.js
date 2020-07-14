import React, { useEffect, useState, createRef } from 'react';
import { Header } from '../header';
import { CurrentDayMain } from '../currentDayMain';
import { CurrentDayAdvanced } from '../currentDayAdvanced';
import { ForeCast } from '../forecast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


import './index.scss';

export const ServiceContainer = () => {
    const [error, setError] = useState(null);
    const [cityNoFound, setCityNotFound] = useState('');
    const [city, setCity] = useState('');
    const [currentDay, setCurrentDay] = useState({});
    const [forecast, setForecast] = useState({});
    const textInput = createRef();

    useEffect(() => {
        const APIkey = process.env.REACT_APP_API_KEY;

        city && Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(resp => resp.json()),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIkey}`).then(resp => resp.json()),
        ]).then(result => {

            if (result[0].cod !== '404' || !city) {
                setCityNotFound('');

                const date = setDate(result[0].dt)
                const sunrise = setTime(result[0].sys.sunrise);
                const sunset = setTime(result[0].sys.sunset);
                const mainInfos = {
                    name: result[0].name,
                    date,
                    icon: result[0].weather[0].icon,
                    desc: result[0].weather[0].description,
                    temp: result[0].main.temp,
                    advanced: {
                        high: result[0].main.temp_max,
                        low: result[0].main.temp_min,
                        wind: result[0].wind.speed,
                        humidity: result[0].main.humidity,
                        sunrise,
                        sunset
                    }
                }

                const forecast = result[1].list.map(({ dt, weather, main }) => {
                    return {
                        date: setDate(dt),
                        time: setTime(dt),
                        icon: weather[0].icon,
                        temp: main.temp_max
                    }
                });

                setCurrentDay(mainInfos)
                setForecast(forecast)
            } else {
                setCityNotFound(result[0].message);
            }
        },
            error => {
                setError(error);
            })
    }, [city])

    const setTime = (ts) => {
        const addZero = i => {
            i < 10 && (i = "0" + i);

            return i;
        }

        const date = new Date(ts * 1000);
        const time = `${addZero(date.getHours())}:${addZero(date.getMinutes())}`

        return time;
    }

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
            
            <form className='cmp-service-container__form' onSubmit={e => { e.preventDefault(); setCity(textInput.current.value); }}>
                <input ref={textInput} placeholder='City Name'/>
                <FontAwesomeIcon icon={faSearch}/>
            </form>

            {!cityNoFound && city && (
                <>
                    <Header city={currentDay.name} date={currentDay.date} />

                    <CurrentDayMain desc={currentDay.desc} icon={currentDay.icon} temp={currentDay.temp} />

                    <CurrentDayAdvanced {...currentDay.advanced} />

                    {forecast.length && forecast.map((item, i) => (
                        <ForeCast key={i} {...item} />
                    ))}
                </>
            )}

            {cityNoFound && <div className='cmp-service-container--error'>{cityNoFound || error}</div>}

        </div>
    );
}
