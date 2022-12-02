import React from "react";
import classes from './EditButton.module.css';

const RemoveButton = props => {
    return <button className={classes['edit-button']} {...props.item}>{props.children}</button>
}

export default EditButton;