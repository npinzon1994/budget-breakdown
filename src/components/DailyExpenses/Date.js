import React from "react";
import classes from './Date.module.css';

const Date = (props) => {
    return <div className={classes.container}>
        <span>{props.month}</span>
        <span className={classes['day-text']}>{props.day}</span>
        <span>{props.year}</span>
    </div>
}

export default Date;