'use client';

import classes from "./TransactionsList.module.css";
import TransactionItem from "./TransactionItem";
import { FC } from "react";
import Transaction from "src/models/transaction";

type Props = {
  transactions: Transaction[];
};

const TransactionsList: FC<Props> = ({ transactions }) => {
  return (
    <div className={classes.wrapper}>
      <ul id="transactions-list" className={classes.list}>
        {transactions.map((transaction) => (
          <TransactionItem
            id={transaction._id}
            amount={transaction.amount }
            isPaid={false}
            date={transaction.date}
            merchant={transaction.merchant}
            onShowEdit={() => {}}
          />
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
