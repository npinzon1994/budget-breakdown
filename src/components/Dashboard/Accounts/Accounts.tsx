"use client";

import classes from "./Accounts.module.css";
import Link from "next/link";
import { FC } from "react";
import Account from "src/models/account";

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
        accounts[i].bank,
        accounts[i].accountNumber,
        accounts[i].routingNumber,
        accounts[i].balance
      )
    );
  }

  return (
    <ul className={classes["account-list"]}>
      {loadedAccounts.map((account) => (
        <li className={classes["account-item"]} key={account._id}>
          <Link
            href={`/dashboard/accounts/${account.accountSlug}`}
            className={classes["account-link"]}
          >
            {account.nickName
              ? account.nickName
              : `${account.bank} ${account.type}`}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Accounts;
