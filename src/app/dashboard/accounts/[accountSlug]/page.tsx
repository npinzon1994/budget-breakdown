import classes from "./page.module.css";
import { FC } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { getAccountDetails } from "src/lib/accounts";
import BackButton from "src/components/UI/Buttons/BackButton";
import Image from "next/image";
import iconPlaceholder from "../../../../assets/account-placeholder.png";
import { formatCurrency } from "src/util/currency";

type PageProps = {
  params: { accountSlug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const AccountDetailsPage: FC<PageProps> = async ({ params }) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not signed in.");
  }

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
  } = await getAccountDetails(user.id, params.accountSlug);

  const isCreditCard = type === "Credit Card";

  return (
    <main className={classes.page}>
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
        <li key="balance">Balance: {formatCurrency(balance)}</li>
        {isCreditCard ? (
          <li key="credit-limit">
            Credit Limit: {formatCurrency(creditLimit)}
          </li>
        ) : undefined}
        {isCreditCard && billingDate ? (
          <li key="billing-date">Billing Date: {billingDate}</li>
        ) : undefined}
        {isCreditCard && dueDate ? (
          <li key="due-date">Due Date: {dueDate}</li>
        ) : undefined}
      </ul>
    </main>
  );
};

export default AccountDetailsPage;
