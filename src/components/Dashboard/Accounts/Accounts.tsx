"use client";

import classes from "./Accounts.module.css";
import Link from "next/link";
import { FC, useState } from "react";
import NewAccountForm from "./NewAccountForm";

type AccountsProps = {
  params: { accountSlug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const Accounts: FC<AccountsProps> = ({ params }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModalHandler = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      {isModalOpen ? (
        <NewAccountForm onClose={toggleModalHandler} />
      ) : undefined}
      <button
        type="button"
        className={classes["new-account-button"]}
        onClick={toggleModalHandler}
      >
        New Account
      </button>
      <ul className={classes["account-list"]}>
        <li className={classes["account-item"]}>
          <Link
            href={`/dashboard/accounts/${params.accountSlug}`}
            className={classes["account-link"]}
          >
            Checking
          </Link>
        </li>
        <li className={classes["account-item"]}>
          <Link href="" className={classes["account-link"]}>
            Savings
          </Link>
        </li>
        <li className={classes["account-item"]}>
          <Link href="" className={classes["account-link"]}>
            BOA Cash Rewards Credit Card
          </Link>
        </li>
        <li className={classes["account-item"]}>
          <Link href="" className={classes["account-link"]}>
            Amazon Chase VISA
          </Link>
        </li>
        <li className={classes["account-item"]}>
          <Link href="" className={classes["account-link"]}>
            Verizon VISA
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Accounts;
