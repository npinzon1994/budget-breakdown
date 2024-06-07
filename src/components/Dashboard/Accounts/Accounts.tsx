"use client";

import classes from "./Accounts.module.css";
import Link from "next/link";
import { FC, useState } from "react";
import NewAccountForm from "./NewAccountForm";
import Account from "src/models/account";
import { useAppDispatch, useAppSelector } from "../../../lib/store/hooks";
import { showHideActions } from "../../../lib/store/show-hide-slice";

type AccountsProps = {
  params: { accountSlug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
  accounts: Account[];
};

const Accounts: FC<AccountsProps> = ({ accounts }) => {
  const showNewAccountModal = useAppSelector(
    (state) => state.showHide.showNewAccountModal
  );
  const dispatch = useAppDispatch();

  const showModalHandler = () => {
    dispatch(showHideActions.setShowNewAccountModal(true));
  };

  const hideModalHandler = () => {
    dispatch(showHideActions.setShowNewAccountModal(false));
  };

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
    <>
      {showNewAccountModal ? (
        <NewAccountForm onClose={hideModalHandler} />
      ) : undefined}
      <button
        type="button"
        className={classes["new-account-button"]}
        onClick={showModalHandler}
      >
        New Account
      </button>
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
    </>
  );
};

export default Accounts;
