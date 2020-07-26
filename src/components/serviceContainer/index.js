import React, { useEffect, useState, createRef } from 'react';
import { Header } from '../header';
import { CurrentDayMain } from '../currentDayMain';
import { CurrentDayAdvanced } from '../currentDayAdvanced';
import { ForeCast } from '../forecast';
import { Loader } from '../loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSearch,
    faBolt,
    faCloudRain,
    faCloudShowersHeavy,
    faSnowflake,
    faSun,
    faCloud,
    faSmog
} from '@fortawesome/free-solid-svg-icons'

import './index.scss';

export const ServiceContainer = ({ done = false }) => {
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [cityNoFound, setCityNotFound] = useState('');
    const [city, setCity] = useState('');
    const [currentDay, setCurrentDay] = useState({});
    const [forecast, setForecast] = useState({});
    const [appearing, setAppearing] = useState(false);
    const [wIcon, setWIcon] = useState(null);
    const textInput = createRef();


    useEffect(() => {
        const APIkey = process.env.REACT_APP_API_KEY;
        done(false);

        city && Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ city }&units=metric&appid=${ APIkey }`).then(resp => resp.json()),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ city }&units=metric&appid=${ APIkey }`).then(resp => resp.json()),
        ]).then(result => {

                if (result[0].cod !== '404' || !city) {
                    setCityNotFound('');
                    setLoaded(false);
                    setAppearing(false);

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
                            wind: result[0].wind.speed,
                            humidity: result[0].main.humidity,
                            sunrise,
                            sunset
                        }
                    };

                    const { main } = result[0].weather[0];

                    if (main === 'Thunderstorm') {
                        setWIcon(faBolt);
                    } else if (main === 'Drizzle') {
                        setWIcon(faCloudRain)
                    } else if (main === 'Rain') {
                        setWIcon(faCloudShowersHeavy)
                    } else if (main === 'Snow') {
                        setWIcon(faSnowflake)
                    } else if (main === 'Clear') {
                        setWIcon(faSun)
                    } else if (main === 'Clouds') {
                        setWIcon(faCloud)
                    } else {
                        setWIcon(faSmog);
                    }

                    const forecast = result[1].list.map(({ dt, weather, main }) => {
                        return {
                            date: setDate(dt),
                            time: setTime(dt),
                            icon: weather[0].icon,
                            temp: main.temp_max
                        }
                    });

                    setCurrentDay(mainInfos);
                    setForecast(forecast);
                    setTimeout(() => {
                        done(true);
                        setLoaded(true)
                    }, 1000);
                    setTimeout(() => setAppearing(true), 1100)
                } else {
                    setLoaded(true);
                    setCityNotFound('Sorry, we did not find this city');
                    setAppearing(false)
                }
            },
            error => {
                setError(error);
                setLoaded(true)
            })
    }, [city]);

    const setTime = (ts) => {
        const addZero = i => {
            i < 10 && (i = "0" + i);

            return i;
        };

        const date = new Date(ts * 1000);
        const time = `${ addZero(date.getHours()) }:${ addZero(date.getMinutes()) }`

        return time;
    };

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

        const newDate = `${ days[date.getDay()] } ${ date.getDate() } ${
            months[date.getMonth()]
        }`;

        return newDate;
    }

    return (
        <div className={ `cmp-service-container ${ city ? 'loaded' : '' } ${ appearing ? 'appearing' : '' }` }>
            <h1 className={ 'cmp-service-container--title' }>Enjoy the app</h1>
            <form className={ `cmp-service-container__form` } onSubmit={ e => {
                e.preventDefault();
                setCity(textInput.current.value);
            } }>
                <input ref={ textInput } placeholder='City Name'/>
                <FontAwesomeIcon icon={ faSearch }/>
            </form>

            { loaded ?
                <>
                    { !cityNoFound && city && (
                        <>
                            <Header city={ currentDay.name } date={ currentDay.date }/>
                            <CurrentDayMain desc={ currentDay.desc } icon={ wIcon } temp={ currentDay.temp }/>

                            { loaded &&
                            currentDay.advanced && <CurrentDayAdvanced { ...currentDay.advanced } />

                            }
                            <div className={ 'cmp-service-container__forcastcontainer' }>
                                { forecast.length && forecast.map((item, i) => (
                                    <ForeCast key={ i } { ...item } />
                                )) }
                            </div>
                        </>
                    ) }
                    { cityNoFound && <div className='cmp-service-container--error'>{ cityNoFound || error }</div> }

                </> : city && <Loader/>
            }
        </div>
    );
};
