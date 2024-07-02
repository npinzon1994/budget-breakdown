"use client";

import classes from "./AccountDetails.module.css";
import BackButton from "src/components/UI/Buttons/BackButton";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Account from "src/models/account";
import { formatCurrency } from "src/util/currency";
import { accountActions } from "src/lib/store/account-slice";
import { useDispatch } from "react-redux";
import addIcon from "../../../assets/add.svg";
import transferIcon from "../../../assets/transfer.svg";
import Transaction from "src/models/transaction";
import Transactions from "src/components/Transactions/Transactions";
import NewTransaction from "src/components/Transactions/NewTransaction";
import { useAppSelector } from "src/lib/store/hooks";
import { showHideActions } from "src/lib/store/show-hide-slice";
import ellipsisIcon from "../../../assets/ellipsis-icon.png";
import AccountIcon from "src/components/UI/Icons/AccountIcon";
import ImagePreview from "src/components/UI/Icons/ImagePreview";
import IconButton from "src/components/UI/Buttons/IconButton";
import { useRouter, usePathname } from "next/navigation";

type Props = {
  account: Account;
  transactions?: Transaction[];
};

const AccountDetails: FC<Props> = ({ account, transactions }) => {
  const dispatch = useDispatch();
  const formVisible = useAppSelector((state) => state.showHide.showNewForm);

  const router = useRouter();
  const url = usePathname();

  useEffect(() => {
    dispatch(accountActions.setCurrentAccount(account));

    // return () => {
    //   dispatch(accountActions.setCurrentAccount(null));
    // };
  }, []);

  const {
    _id: account_ID,
    associatedUser_ID,
    type: accountType,
    nickName: accountName,
    accountNumber,
    balance: accountBalance,
    icon: accountIcon,
    note: accountNote,
    creditLimit,
    billingDate,
    dueDate,
  } = account;

  return (
    <div className={classes["main-account-info"]}>
      <div className={classes["back-button-container"]}>
        <BackButton />
      </div>
      <div className={classes["card-container"]}>
        <div className={classes["ellipsis-wrapper"]}>
          <IconButton
            src={ellipsisIcon}
            alt="view more icon"
            onClick={() => {
              router.push(`${url}/edit`);
            }}
            buttonClasses={classes["ellipsis-button"]}
            imageClasses={classes["ellipsis-icon"]}
          />
        </div>
        <div className={classes.card}>
          <div className={classes.top}>
            <AccountIcon
              icon={accountIcon}
              className={classes["account-icon"]}
            />
            <div className={classes["text-wrapper-vertical"]}>
              <div className={classes["text-wrapper-horizontal"]}>
                <span className={classes.name}>{accountName}</span>
                <span className={classes.balance}>
                  {formatCurrency(Number(accountBalance))}
                </span>
              </div>
              <div className={classes["text-wrapper-horizontal"]}>
                <span className={classes.note}>{accountNote}</span>
                <span className={classes["remaining-balance"]}>
                  Rem. {formatCurrency(Number(accountBalance))}
                </span>
              </div>
              <div className={classes["text-wrapper-horizontal"]}>
                <span className={classes.type}>{accountType}</span>
              </div>
            </div>
          </div>

          <div className={classes.controls}>
            <IconButton
              src={addIcon}
              alt="Add transaction plus sign icon"
              onClick={() => dispatch(showHideActions.setShowNewForm(true))}
              buttonClasses={classes["add-button"]}
              imageClasses={classes["add-image"]}
            />
            <IconButton
              src={transferIcon}
              alt="Transfer money icon"
              onClick={() => {}}
              buttonClasses={classes["transfer-button"]}
              imageClasses={classes["add-image"]}
            />
          </div>
        </div>
        {formVisible ? (
          <NewTransaction
            onClose={() => dispatch(showHideActions.setShowNewForm(false))}
            onDelete={() => {}}
          />
        ) : undefined}
      </div>
    </div>
  );
};

export default AccountDetails;
