import { FC } from "react";
import classes from "./MainHeader.module.css";
import { useContext } from "react";
import ExpensesContext from "../../context/expense-context";
import useWindowHeight from "../../hooks/use-window-height";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const MainHeader: FC = () => {
  const screenHeight = useWindowHeight();
  const bannerHeight = screenHeight * 0.115;

  const expensesContext = useContext(ExpensesContext);
  const totalBalance = currencyFormatter.format(expensesContext.totalBalance);

  return (
    // <div
    //   className={classes.container}
    //   style={{ minHeight: `${bannerHeight}px` }}
    // >
    <div className={classes["remaining-balance"]} data-tooltip="Total Balance">
      <span className={classes["total-label"]}>Total</span>
      <span className={classes["total-balance"]}>{totalBalance}</span>
    </div>
    // </div>
  );
};

export default MainHeader;
