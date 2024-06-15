"use client";

import Image from "next/image";
import classes from "./Accounts.module.css";
import Link from "next/link";
import { FC } from "react";
import Account from "src/models/account";
import ImagePreview from "src/components/UI/ImagePreview";
import { formatCurrency } from "src/util/currency";

type AccountsProps = {
  params: { accountSlug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
  accounts: Account[];
};

const Accounts: FC<AccountsProps> = ({ accounts }) => {
  const loadedAccounts: Account[] = [];
  for (let i = 0; i < accounts.length; i++) {
    const account_ID = accounts[i]._id.toString();

    loadedAccounts.push(
      new Account(
        account_ID,
        accounts[i].associatedUser_ID,
        accounts[i].accountSlug,
        accounts[i].type,
        accounts[i].nickName,
        accounts[i].accountNumber,
        accounts[i].balance,
        accounts[i].icon,
        accounts[i].note,
        accounts[i].creditLimit,
        accounts[i].billingDate,
        accounts[i].dueDate
      )
    );
  }

  const displayedAccounts = loadedAccounts.map((account) => (
    <li className={classes.item} key={account._id}>
      <Link
        href={`/dashboard/accounts/${account.accountSlug}`}
        className={classes.link}
      >
        <div className={classes["account-information"]}>
          <div className={classes["name-icon-container"]}>
            <ImagePreview
              icon={account.icon}
              className={classes.icon}
            />
            <span className={classes.name}>{account.nickName}</span>
          </div>
          <span className={classes["account-number"]}>
            {account.accountNumber}
          </span>
        </div>
        <div className={classes["balance-information"]}>
          <div>
            <span className={classes["currency-label"]}>Balance</span>
            <span className={classes.currency}>
              {formatCurrency(Number(account.balance))}
            </span>
          </div>
          {account.creditLimit ? (
            <div>
              <span className={classes["currency-label"]}>Available</span>
              <span className={classes.currency}>
              {formatCurrency(Number(account.creditLimit))}
              </span>
            </div>
          ) : undefined}
        </div>
      </Link>
    </li>
  ));

  const userHasAccounts = displayedAccounts.length > 0;

  return (
    <section className={classes.section}>
      {userHasAccounts ? (
        <ul className={classes.list}>{displayedAccounts}</ul>
      ) : (
        <p className={classes["placeholder-message"]}>No accounts to show.</p>
      )}
    </section>
  );
};

export default Accounts;
