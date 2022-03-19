import React, { Fragment } from "react";
import DailyExpensesList from "./DailyExpensesList";
import Card from "./UI/Card";

const DailyExpenses = (props) => {
  //in this component, PROPS are the DUMMY_EXPENSES (an array of objects)

  return (
    <Fragment>
      {console.log("BEFORE CARD RENDER (FROM DailyExpenses)")}
      <DailyExpensesList items={props.items} />
      {console.log("AFTER CARD RENDER (FROM DailyExpenses)")}
    </Fragment>
  );
};

export default DailyExpenses;
