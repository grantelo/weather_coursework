import React, {useEffect, useState} from 'react';

import SwiperCore, {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import Slide from "./Slide";

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import axios from "axios";

SwiperCore.use([Navigation]);

const Result = ({weather}) => {
    const [weatherStat, setWeatherStat] = useState([])

    console.log(weatherStat)

    useEffect(() => {
        axios
            .get("/weather")
            .then(({data}) => {
                setWeatherStat(data)
            })
    }, [])

    const handleForecastMathed = (id) => {
        axios
            .patch(`/weather/${id}`, {
                forecastTrue: weatherStat.find(item => item.id === id).forecastTrue + 1,
                count: weatherStat.find(item => item.id === id).count + 1
            })
            .then(({data}) => {
                const weather = weatherStat.filter(item => item.id !== id)
                setWeatherStat([...weather, data])
            })
    }

    const handleForecastNotMathed = (id) => {
        axios
            .patch(`/weather/${id}`, {
                count: weatherStat.find(item => item.id === id).count + 1
            })
            .then(({data}) => {
                const weather = weatherStat.filter(item => item.id !== id)
                setWeatherStat([...weather, data])
            })
    }

    SwiperCore.use([Navigation])

    return (
        <Swiper
            slidesPerView={1}
            navigation
        >
            <SwiperSlide>
                <Slide
                    handleForecastMathed={handleForecastMathed}
                    handleForecastNotMathed={handleForecastNotMathed}
                    weatherStat={weatherStat.find(item => item.id === 1)}
                    weather={
                        {
                            ...weather, temp: weather.temp[0],
                            fealsLike: weather.fealsLike[0],
                            pressure: weather.pressure[0],
                            humidity: weather.humidity[0],
                            wind: weather.wind[0]
                        }
                    }>
                </Slide>
            </SwiperSlide>
            <SwiperSlide>
                <Slide
                    handleForecastMathed={handleForecastMathed}
                    handleForecastNotMathed={handleForecastNotMathed}
                    weatherStat={weatherStat.find(item => item.id === 2)}
                    weather={
                        {
                            ...weather, temp: weather.temp[1],
                            fealsLike: weather.fealsLike[1],
                            pressure: weather.pressure[1],
                            humidity: weather.humidity[1],
                            wind: weather.wind[1]
                        }
                    }>
                </Slide>
            </SwiperSlide>
        </Swiper>
    )
}

export default Result;