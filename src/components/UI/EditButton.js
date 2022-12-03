import React from "react";
import classes from './EditButton.module.css';

const EditButton = props => {
    return <button className={classes['edit-button']} {...props.item}>{props.children}</button>
}

export default EditButton;