import React from 'react';

import '../animation.css'

import Typography from "@material-ui/core/Typography";
import {Box, Button, Container, makeStyles} from "@material-ui/core";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCloud,
    faBolt,
    faCloudRain,
    faCloudShowersHeavy,
    faSnowflake,
    faSun,
    faSmog,
} from '@fortawesome/free-solid-svg-icons';
import Forecast from "./Forecast";
import axios from "axios";

const useStyles = makeStyles(() => ({
    root: {
        color: "#fff",
        paddingTop: "40px",
        position: "relative",
        top: "20px",
        opacity: 0,
        animation: "up 0.5s ease 1.4s forwards"
    },
    box: {
        display: "flex",
        marginTop: "30px"
    },
    title: {
        fontWeight: 700
    },
    temp: {
        fontSize: "110px",
        lineHeight: 1
    },
    currentWeatherBox: {
        display: "flex",
        flexBasis: "50%"
    },
    weatherIcon: {
        fontSize: "140px",
        color: "#fff",
        marginRight: "40px"
    },
    description: {
        textTransform: "capitalize",
        fontSize: "26px"
    },
    detailsWeatherBox: {
        flexBasis: "50%",
        padding: "10px 0",
        borderRadius: "10px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.3)",
        color: "inherit",
        marginBottom: "20px",
    },
    paperItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        flexBasis: "33%",
        boxSizing: "border-box",
        fontSize: "26px"
    },
    button: {
        position: "absolute",
        right: "250px",
        top: "40px",
        "&+&": {
            right: "10px"
        }
    },

}))

const Slide = ({weatherStat, weather, handleForecastMathed, handleForecastNotMathed}) => {
    const classes = useStyles()
    const {
        city,
        country,
        date,
        temp,
        main,
        description,
        tempMax,
        tempMin,
        wind,
        sunset,
        sunrise,
        humidity,
        forecast
    } = weather

    let weatherIcon = null

    switch (main) {
        case "Thunderstorm":
            weatherIcon = <FontAwesomeIcon icon={faBolt}/>
            break
        case "Drizzle":
            weatherIcon = <FontAwesomeIcon icon={faCloudRain}/>
            break
        case "Rain":
            weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy}/>
            break
        case "Snow":
            weatherIcon = <FontAwesomeIcon icon={faSnowflake}/>
            break
        case "Clear":
            weatherIcon = <FontAwesomeIcon icon={faSun}/>
            break
        case "Clouds":
            weatherIcon = <FontAwesomeIcon icon={faCloud}/>
            break
        default:
            weatherIcon = <FontAwesomeIcon icon={faSmog}/>
    }

    weatherIcon = React.cloneElement(weatherIcon, {className: classes.weatherIcon})
    return (
        <Box className={classes.root}>
            <Button onClick={() => handleForecastMathed(weatherStat.id)} className={classes.button} variant={"contained"} color={"primary"}>forecast matched</Button>
            <Button onClick={() => handleForecastNotMathed(weatherStat.id)} className={classes.button} variant={"contained"} color={"secondary"}>forecast did not match</Button>
            <Container>
                <Typography className={classes.title}>Forecast probability: {weatherStat?.count && Math.round(weatherStat?.forecastTrue / weatherStat?.count * 100)} %</Typography>
                <Typography className={classes.title} variant={"h2"}>{`${city}, ${country}`}</Typography>
                <Typography variant={"h4"}>{date}</Typography>
                <Box className={classes.box}>
                    <Box className={classes.currentWeatherBox}>
                        {weatherIcon}
                        <Box className={classes.temperatureBox}>
                            <Typography className={classes.temp}>{temp}&#176;</Typography>
                            <Typography className={classes.description} variant={"subtitle1"}>{description}</Typography>
                        </Box>
                    </Box>
                    <Box className={classes.detailsWeatherBox}>
                        <Box className={classes.paperItem}>
                            <Typography style={{fontSize: "inherit"}} variant={"body2"}>{tempMax}&#176;</Typography>
                            <Typography style={{fontSize: "inherit"}} variant={"body2"}>Hight</Typography>
                        </Box>
                        <Box className={classes.paperItem}>
                            <Typography style={{fontSize: "inherit"}} variant={"body2"}>{wind} mph</Typography>
                            <Typography style={{fontSize: "inherit"}} variant={"body2"}>Wind</Typography>
                        </Box>
                        <Box className={classes.paperItem}>
                            <Typography style={{fontSize: "inherit"}} variant={"body2"}>{sunrise}</Typography>
                            <Typography style={{fontSize: "inherit"}} variant={"body2"}>Sunrise</Typography>
                        </Box>
                        <Box className={classes.paperItem}>
                            <Typography style={{fontSize: "inherit"}} variant={"body2"}>{tempMin}&#176;</Typography>
                            <Typography style={{fontSize: "inherit"}} variant={"body2"}>Low</Typography>
                        </Box>
                        <Box className={classes.paperItem}>
                            <Typography style={{fontSize: "inherit"}} variant={"body2"}>{humidity}%</Typography>
                            <Typography style={{fontSize: "inherit"}} variant={"body2"}>Humidity</Typography>
                        </Box>
                        <Box className={classes.paperItem}>
                            <Typography style={{fontSize: "inherit"}} variant={"body2"}>{sunset}</Typography>
                            <Typography style={{fontSize: "inherit"}} variant={"body2"}>Sunset</Typography>
                        </Box>
                    </Box>
                </Box>
                <Forecast forecast={forecast}/>
            </Container>
        </Box>
    )
}

export default Slide;