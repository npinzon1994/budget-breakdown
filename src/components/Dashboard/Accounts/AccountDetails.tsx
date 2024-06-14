"use client";

import classes from "./AccountDetails.module.css";
import BackButton from "src/components/UI/Buttons/BackButton";
import Image from "next/image";
import { FC, useEffect } from "react";
import Account from "src/models/account";
import iconPlaceholder from "../../../assets/account-placeholder.png";
import { formatCurrency } from "src/util/currency";
import { useAppDispatch } from "src/lib/store/hooks";
import { accountActions } from "src/lib/store/account-slice";
import { useDispatch } from "react-redux";

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
    creditLimit,
    billingDate,
    dueDate,
  } = account;

  const isCreditCard = type === "Credit Card";

  return (
    <>
      <BackButton />

      <h1 className={classes.title}>{nickName}</h1>
      <p className={classes.id}>{`(ID — ${_id})`}</p>
      <div className={classes.preview}>
        {icon ? (
          <Image
            src={`https://budget-breakdown-account-images.s3.us-east-2.amazonaws.com/${icon}`}
            alt="account icon"
            fill
          />
        ) : (
          <Image src={iconPlaceholder} alt="account placeholder icon" fill />
        )}
      </div>
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
    </>
  );
};

export default AccountDetails;
