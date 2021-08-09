import {useState} from "react";

import Typography from '@material-ui/core/Typography';
import {Box, fade, InputBase, makeStyles} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";

import Slide from "./Component/Slide";
import NotFound from "./Component/NotFound";
import Result from "./Component/Result";


const useStyles = makeStyles((theme) => ({
    root: ({showResult}) => ({
        paddingTop: showResult ? "0%" : "20%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        transition: "all 0.8s ease 0s"
    }),
    title: ({showResult}) => ({
        color: "#fff",
        opacity: showResult ? "0" : "1",
        transition: "all 0.8s ease 0s",
        marginTop: showResult && "-71px"
    }),
    form: {
        marginTop: "60px",
        position: "relative",
        borderRadius: "30px",
        backgroundColor: "#fff",
        maxWidth: "500px",
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        padding: "15px 20px 15px 45px",
        boxSizing: "border-box"
    },
    searchIcon: {
        color: "rgb(197, 197, 197)",
        position: "absolute",
        left: "10px",
        pointerEvents: 'none',//???
    },
    inputBase: {
        fontSize: "18px",
        width: "100%",
        background: "transparent",
    },
    inputInput: {
        color: "rgb(197, 197, 197)",
        padding: 0,
        transition: "all 0.5s",
        "&:focus": {
            color: "rgb(25, 25, 25)",
            //boxShadow: "rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px"
        }
    },
}))

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

function App() {
    const APIkey = "a0e279d91e85ef70d20ada15e085403d"
    const APIkey2 = "8dc525b69a494e5ba3242a4c0caabf70"
    const [value, setValue] = useState("")
    const [weatherInfo, setWeatherInfo] = useState(null)
    const [error, setError] = useState(false)
    const classes = useStyles({showResult: !!(error || weatherInfo)})

    const handleSubmit = (e) => {
        e.preventDefault()
        const weather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${APIkey}&units=metric`;
        const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=${APIkey}&units=metric`;
        const weather2 = `https://api.weatherbit.io/v2.0/current?key=${APIkey2}&city=${value}`

        Promise.all([axios.get(weather), axios.get(forecast), axios.get(weather2)])
            .then(([{data: data1}, {data: data2}, {data: {data: data3}}]) => {
                const currentDate = new Date()
                const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
                const sunrise = new Date(data1.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5)
                const sunset = new Date(data1.sys.sunset * 1000).toLocaleTimeString().slice(0, 5)
                setError(false)
                setWeatherInfo({
                    date,
                    sunrise,
                    sunset,
                    description: data1.weather[0].description,
                    main: data1.weather[0].main,
                    icon: data1.weather[0].icon,
                    temp: [Math.round(data1.main.temp), Math.round(data3[0].temp)],//avg(data1.main.temp, data3[0].temp)
                    fealsLike: [data1.main.feels_like, data3[0].app_temp],//avg(data1.main.feels_like, data3[0].app_temp),
                    tempMin: Math.floor(data1.main.temp_min),
                    tempMax: Math.ceil(data1.main.temp_max),
                    pressure: [data1.main.pressure, data3[0].pres],//avg(data1.main.pressure, data3[0].pres),
                    humidity: [Math.round(data1.main.humidity),Math.round(data3[0].rh)],//avg(data1.main.humidity, data3[0].rh)
                    wind: [Math.round(data1.wind.speed), Math.round(data3[0].wind_spd)],//avg(data1.wind.speed, data3[0].wind_spd)
                    country: data1.sys.country,
                    city: data1.name,
                    forecast: data2.list
                })
            })
            .catch(err => {
                console.log(err)

                setError(true)
                setWeatherInfo(null)
            })
    }

    const handleChange = (e) => {
        console.log(e.target.value)
        setValue(e.target.value)
    }
    console.log(error)
    return (
        <>
            <Box className={classes.root}>
                <Typography
                    className={classes.title}
                    variant={"h2"}
                >
                    WEATHER APP
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <div className={classes.searchIcon}>
                        <SearchIcon/>
                    </div>
                    <InputBase
                        onChange={handleChange}
                        placeholder="Enter city"
                        className={classes.inputBase}
                        classes={{
                            //root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{'aria-label': 'search'}}
                    />
                </form>
            </Box>
            {weatherInfo && <Result weather={weatherInfo}/>}
            {error && <NotFound/>}
        </>
    )
}

export default App;
