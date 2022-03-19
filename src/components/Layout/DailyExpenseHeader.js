import React from "react";
import classes from './DailyExpenseHeader.module.css';

const DailyExpenseHeader = () => {
    return <div className={classes.titles}>
        <span>Amount</span>
        <span>Date</span>
        <span>Paid Off?</span>
        <span>Merchant</span>
    </div>
}

export default DailyExpenseHeader;