"use client";

import classes from "./AccountDetails.module.css";
import BackButton from "src/components/UI/Buttons/BackButton";
import Image from "next/image";
import { FC, useEffect } from "react";
import Account from "src/models/account";
import iconPlaceholder from "../../../assets/account-placeholder.png";
import { formatCurrency } from "src/util/currency";
import { accountActions } from "src/lib/store/account-slice";
import { useDispatch } from "react-redux";
import ImagePreview from "src/components/UI/ImagePreview";
import addIcon from "../../../assets/add.svg";
import transferIcon from "../../../assets/transfer.svg";

type Props = {
  account: Account;
};

const AccountDetails: FC<Props> = ({ account }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(accountActions.setCurrentAccount(account));

    return () => {
      dispatch(accountActions.setCurrentAccount(null));
    };
  }, []);

  const {
    _id,
    associatedUser_ID,
    type,
    nickName,
    accountNumber,
    balance,
    icon,
    note,
    creditLimit,
    billingDate,
    dueDate,
  } = account;

  const isCreditCard = type === "Credit Card";

  return (
    <div className={classes.wrapper}>
      <div className={classes["main-account-info"]}>
        <BackButton />
        <div className={classes.card}>
          <div className={classes.left}>
            <div className={classes["name-note-wrapper"]}>
              <ImagePreview icon={icon} className={classes.icon} />
              <div className={classes["name-note-container"]}>
                <span className={classes.name}>{nickName}</span>
                {accountNumber ? (
                  <span className={classes.note}>{accountNumber}</span>
                ) : undefined}
              </div>
            </div>
            <div className={classes.controls}>
              <button
                type="button"
                className={`${classes.button} ${classes.add}`}
              >
                <div className={classes["add-image-wrapper"]}>
                  <Image src={addIcon} alt="Add transaction icon" />
                </div>
                <span className={classes["button-text"]}>Transaction</span>
              </button>
              <button
                type="button"
                className={`${classes.button} ${classes.transfer}`}
              >
                <div className={classes["add-image-wrapper"]}>
                  <Image src={transferIcon} alt="transfer money icon" />
                </div>
                <span className={classes["button-text"]}>Transfer</span>
              </button>
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes["balance-container"]}>
              <span className={classes.balance}>
                {formatCurrency(Number(balance))}
              </span>
              <span className={classes["remaining-balance"]}>
                Rem. {formatCurrency(Number(balance))}
              </span>
            </div>
          </div>
        </div>

        <p className={classes.id}>{`(ID — ${_id})`}</p>
        <ul>
          {/* <li key={associatedUser_ID}>User ID: {associatedUser_ID}</li> */}
          <li key="type">Type: {type}</li>
          <li key="name">Name: {nickName}</li>
          <li key="account-number">Account Number: {accountNumber}</li>
          <li key="balance">Balance: {formatCurrency(Number(balance))}</li>
          {isCreditCard ? (
            <li key="credit-limit">
              Credit Limit: {formatCurrency(Number(creditLimit))}
            </li>
          ) : undefined}
          {isCreditCard && billingDate ? (
            <li key="billing-date">Billing Date: {billingDate}</li>
          ) : undefined}
          {isCreditCard && dueDate ? (
            <li key="due-date">Due Date: {dueDate}</li>
          ) : undefined}
        </ul>
      </div>

      <div className={classes.transactions}></div>
    </div>
  );
};

export default AccountDetails;
