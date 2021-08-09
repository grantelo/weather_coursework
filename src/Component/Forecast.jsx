import React from 'react';
import {Box, makeStyles} from "@material-ui/core";
import ForecastHour from "./ForecastHour";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
    box: {
        height: "500px",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        overflowY: "auto",
        marginTop: "20px"
    }
}))

const Forecast = ({forecast}) => {
    const classes = useStyles()

    return (
        <Box>
            <Typography variant={"h4"}>Forecast</Typography>
            <Box className={classes.box}>
                {forecast.map(obj => (
                    <ForecastHour
                        key={obj.dt}
                        date={`${obj.dt_txt.slice(5, 7)}.${obj.dt_txt.slice(8, 10)}`}
                        temp={Math.round(obj.main.temp)}
                        icon={obj.weather[0].icon}
                        hour={obj.dt_txt.slice(11, 16)}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default Forecast;