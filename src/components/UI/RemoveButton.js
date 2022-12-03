import React from "react";
import classes from './RemoveButton.module.css';

const RemoveButton = props => {
    return <button className={classes['remove-button']} {...props.button}>{props.children}</button>
}

export default RemoveButton;