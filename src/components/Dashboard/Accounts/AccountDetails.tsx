"use client";

import classes from "./AccountDetails.module.css";
import BackButton from "src/components/UI/Buttons/BackButton";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Account from "src/models/account";
import { formatCurrency } from "src/util/currency";
import { accountActions } from "src/lib/store/account-slice";
import { useDispatch } from "react-redux";
import ImagePreview from "src/components/UI/ImagePreview";
import addIcon from "../../../assets/add.svg";
import transferIcon from "../../../assets/transfer.svg";
import Transaction from "src/models/transaction";
import TransactionsList from "src/components/Transactions/TransactionsList";
import NewTransaction from "src/components/Transactions/NewTransaction";
import { useAppSelector } from "src/lib/store/hooks";
import { showHideActions } from "src/lib/store/show-hide-slice";

type Props = {
  account: Account;
  transactions: Transaction[];
};

const AccountDetails: FC<Props> = ({ account, transactions }) => {
  const dispatch = useDispatch();
  const formVisible = useAppSelector((state) => state.showHide.showNewForm);
  // const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    dispatch(accountActions.setCurrentAccount(account));

    return () => {
      dispatch(accountActions.setCurrentAccount(null));
    };
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
    <div className={classes.wrapper}>
      <div className={classes["main-account-info"]}>
        <div className={classes["back-button-container"]}>
          <BackButton />
        </div>
        <div className={classes.card}>
          <div className={classes.top}>
            <ImagePreview icon={accountIcon} className={classes.icon} />
            <div className={classes["text-wrapper-vertical"]}>
              <div className={classes["text-wrapper-horizontal"]}>
                <span className={classes.name}>{accountName}</span>
                <span className={classes.balance}>
                  {formatCurrency(Number(accountBalance))}
                </span>
              </div>
              <div className={classes["text-wrapper-horizontal"]}>
                <span className={classes.note}>{accountNumber}</span>
                <span className={classes["remaining-balance"]}>
                  Rem. {formatCurrency(Number(accountBalance))}
                </span>
              </div>
            </div>
          </div>

          <div className={classes.controls}>
            <button
              type="button"
              className={`${classes.button} ${classes.add}`}
              onClick={() => dispatch(showHideActions.setShowNewForm(true))}
            >
              <div className={classes["add-image-wrapper"]}>
                <Image src={addIcon} alt="Add transaction icon" />
              </div>
              {/* <span className={classes["button-text"]}>Transaction</span> */}
            </button>
            <button
              type="button"
              className={`${classes.button} ${classes.transfer}`}
            >
              <div className={classes["add-image-wrapper"]}>
                <Image src={transferIcon} alt="transfer money icon" />
              </div>
              {/* <span className={classes["button-text"]}>Transfer</span> */}
            </button>
          </div>
        </div>
        <div className={classes.card}>
          <div className={classes.top}>
            <ImagePreview icon={accountIcon} className={classes.icon} />
            <div className={classes["text-wrapper-vertical"]}>
              <div className={classes["text-wrapper-horizontal"]}>
                <span className={classes.name}>{accountName}</span>
                <span className={classes.balance}>
                  {formatCurrency(Number(accountBalance))}
                </span>
              </div>
              <div className={classes["text-wrapper-horizontal"]}>
                <span className={classes.note}>{accountNumber}</span>
                <span className={classes["remaining-balance"]}>
                  Rem. {formatCurrency(Number(accountBalance))}
                </span>
              </div>
            </div>
          </div>

          <div className={classes.controls}>
            <button
              type="button"
              className={`${classes.button} ${classes.add}`}
              onClick={() => dispatch(showHideActions.setShowNewForm(true))}
            >
              <div className={classes["add-image-wrapper"]}>
                <Image src={addIcon} alt="Add transaction icon" />
              </div>
              {/* <span className={classes["button-text"]}>Transaction</span> */}
            </button>
            <button
              type="button"
              className={`${classes.button} ${classes.transfer}`}
            >
              <div className={classes["add-image-wrapper"]}>
                <Image src={transferIcon} alt="transfer money icon" />
              </div>
              {/* <span className={classes["button-text"]}>Transfer</span> */}
            </button>
          </div>
        </div>
        <div className={classes.card}>
          <div className={classes.top}>
            <ImagePreview icon={accountIcon} className={classes.icon} />
            <div className={classes["text-wrapper-vertical"]}>
              <div className={classes["text-wrapper-horizontal"]}>
                <span className={classes.name}>{accountName}</span>
                <span className={classes.balance}>
                  {formatCurrency(Number(accountBalance))}
                </span>
              </div>
              <div className={classes["text-wrapper-horizontal"]}>
                <span className={classes.note}>{accountNumber}</span>
                <span className={classes["remaining-balance"]}>
                  Rem. {formatCurrency(Number(accountBalance))}
                </span>
              </div>
            </div>
          </div>

          <div className={classes.controls}>
            <button
              type="button"
              className={`${classes.button} ${classes.add}`}
              onClick={() => dispatch(showHideActions.setShowNewForm(true))}
            >
              <div className={classes["add-image-wrapper"]}>
                <Image src={addIcon} alt="Add transaction icon" />
              </div>
              {/* <span className={classes["button-text"]}>Transaction</span> */}
            </button>
            <button
              type="button"
              className={`${classes.button} ${classes.transfer}`}
            >
              <div className={classes["add-image-wrapper"]}>
                <Image src={transferIcon} alt="transfer money icon" />
              </div>
              {/* <span className={classes["button-text"]}>Transfer</span> */}
            </button>
          </div>
        </div>
        <div className={classes.card}>
          <div className={classes.top}>
            <ImagePreview icon={accountIcon} className={classes.icon} />
            <div className={classes["text-wrapper-vertical"]}>
              <div className={classes["text-wrapper-horizontal"]}>
                <span className={classes.name}>{accountName}</span>
                <span className={classes.balance}>
                  {formatCurrency(Number(accountBalance))}
                </span>
              </div>
              <div className={classes["text-wrapper-horizontal"]}>
                <span className={classes.note}>{accountNumber}</span>
                <span className={classes["remaining-balance"]}>
                  Rem. {formatCurrency(Number(accountBalance))}
                </span>
              </div>
            </div>
          </div>

          <div className={classes.controls}>
            <button
              type="button"
              className={`${classes.button} ${classes.add}`}
              onClick={() => dispatch(showHideActions.setShowNewForm(true))}
            >
              <div className={classes["add-image-wrapper"]}>
                <Image src={addIcon} alt="Add transaction icon" />
              </div>
              {/* <span className={classes["button-text"]}>Transaction</span> */}
            </button>
            <button
              type="button"
              className={`${classes.button} ${classes.transfer}`}
            >
              <div className={classes["add-image-wrapper"]}>
                <Image src={transferIcon} alt="transfer money icon" />
              </div>
              {/* <span className={classes["button-text"]}>Transfer</span> */}
            </button>
          </div>
        </div>
        <div className={classes.card}>
          <div className={classes.top}>
            <ImagePreview icon={accountIcon} className={classes.icon} />
            <div className={classes["text-wrapper-vertical"]}>
              <div className={classes["text-wrapper-horizontal"]}>
                <span className={classes.name}>{accountName}</span>
                <span className={classes.balance}>
                  {formatCurrency(Number(accountBalance))}
                </span>
              </div>
              <div className={classes["text-wrapper-horizontal"]}>
                <span className={classes.note}>{accountNumber}</span>
                <span className={classes["remaining-balance"]}>
                  Rem. {formatCurrency(Number(accountBalance))}
                </span>
              </div>
            </div>
          </div>

          <div className={classes.controls}>
            <button
              type="button"
              className={`${classes.button} ${classes.add}`}
              onClick={() => dispatch(showHideActions.setShowNewForm(true))}
            >
              <div className={classes["add-image-wrapper"]}>
                <Image src={addIcon} alt="Add transaction icon" />
              </div>
              {/* <span className={classes["button-text"]}>Transaction</span> */}
            </button>
            <button
              type="button"
              className={`${classes.button} ${classes.transfer}`}
            >
              <div className={classes["add-image-wrapper"]}>
                <Image src={transferIcon} alt="transfer money icon" />
              </div>
              {/* <span className={classes["button-text"]}>Transfer</span> */}
            </button>
          </div>
        </div>
        {formVisible ? (
          <NewTransaction
            onClose={() => dispatch(showHideActions.setShowNewForm(false))}
            onDelete={() => {}}
          />
        ) : undefined}
      </div>

      <div className={classes.transactions}>
        <h1>Transactions</h1>
        {transactions.length > 0 ? (
          <TransactionsList transactions={transactions} />
        ) : (
          <p className={classes["empty-message"]}>
            No transactions recorded for this account.
          </p>
        )}
      </div>
    </div>
  );
};

export default AccountDetails;
