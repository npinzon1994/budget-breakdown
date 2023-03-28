import React from "react";
import classes from "./MainHeader.module.css";
import { useContext } from "react";
import ExpensesContext from "../../store/expenses-context";
import Card from "../UI/Card";
import useWindowHeight from "../../hooks/use-window-height";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const MainHeader = (props) => {
  const screenHeight = useWindowHeight();
  const bannerHeight = screenHeight * 0.115;

  const expensesContext = useContext(ExpensesContext);
  const totalBalance = currencyFormatter.format(expensesContext.totalBalance);

  return (
    <Card
      className={classes.container}
      style={{ minHeight: `${bannerHeight}px` }}
    >
      <div className={classes["remaining-balance"]} datatooltip="Total Balance">
        <span className={classes["total-label"]}>Total</span>
        <span className={classes["total-balance"]}>{totalBalance}</span>
      </div>
    </Card>
  );
};

export default MainHeader;
