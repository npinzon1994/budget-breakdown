"use client";

import classes from "./Transactions.module.css";
import TransactionItem from "./TransactionItem";
import { FC } from "react";
import Transaction from "src/models/transaction";

type Props = {
  transactions: Transaction[];
};

const Transactions: FC<Props> = ({ transactions }) => {
  return (
    <div className={classes.transactions}>
      <h1>Transactions</h1>
      {transactions.length > 0 ? (
        <ul id="transactions-list" className={classes.list}>
          {transactions.map((transaction) => (
            <TransactionItem
              id={transaction._id}
              amount={transaction.amount}
              isPaid={false}
              date={transaction.date}
              merchant={transaction.merchant}
              onShowEdit={() => {}}
            />
          ))}
        </ul>
      ) : (
        <p className={classes["empty-message"]}>
          No transactions recorded for this account.
        </p>
      )}
    </div>
  );
};

export default Transactions;
