import React, { Fragment } from "react";
import classes from './DailyExpenseHeader.module.css';

const DailyExpenseHeader = () => {
    return <Fragment>
        <header className={classes.titles}>
        <span>Amount</span>
        <span>Date</span>
        <span>Paid Off?</span>
        <span>Merchant</span>
    </header>
    <hr />
    </Fragment>
}

export default DailyExpenseHeader;