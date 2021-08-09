import React from 'react';

import '../animation.css'

import {Box, makeStyles} from "@material-ui/core";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFrown} from '@fortawesome/free-solid-svg-icons';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
    root: {
        position: "relative",
        maxWidth: "600px",
        width: "100%",
        padding: "20px",
        top: "20px",
        opacity: 0,
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255, 255, 255, 0.3)",
        color: "#fff",
        fontSize: "20px",
        animation: "up 0.5s ease 1.4s forwards",
        margin: "100px auto 0px"
    },
    icon: {
        marginRight: "10px",
        width: "40px !important",
        height: "40px"
    }
}))

const NotFound = () => {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <FontAwesomeIcon className={classes.icon} icon={faFrown}/>
            <Typography>Sorry, the specified city was not found..</Typography>
        </Box>
    )
}

export default NotFound;