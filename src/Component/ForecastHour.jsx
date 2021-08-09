import React from 'react';
import {Box, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles(() => ({
    root: {
        textAlign: "center",
        fontSize: "19px",
        flexBasis: "7%",
        padding: "10px",
        margin: "0 5px 5px 0",
        background: "rgba(255, 255, 255, 0.3)",
        borderRadius: "5px"
    },
    temp: {
        fontSize: "26px",
    }
}))

const ForecastHour = ({date, hour, icon, temp}) => {
    const classes = useStyle()
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

    return (
        <Box className={classes.root}>
            <Typography className={classes.date}>{date}</Typography>
            <Typography className={classes.hour}>{hour}</Typography>
            <img width={"50px"} height={"50px"} src={iconUrl}/>
            <Typography className={classes.temp}>{temp}&#176;</Typography>
        </Box>
    )
}

export default ForecastHour;