import classes from "./page.module.css";
import { FC } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { getAccountDetails } from "src/lib/accounts";
import BackButton from "src/components/UI/Buttons/BackButton";

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
    accountSlug,
    type,
    nickName,
    bank,
    accountNumber,
    routingNumber,
    balance,
  } = await getAccountDetails(user.id, params.accountSlug);

  return (
    <main className={classes.page}>
      <BackButton />

      <h1 className={classes.title}>{nickName}</h1>
      <p className={classes.id}>{`(ID — ${_id})`}</p>
      <ul>
        <li key={associatedUser_ID}>User ID: {associatedUser_ID}</li>
        <li key={type}>Type: {type}</li>
        <li key={nickName}>Nickname: {nickName}</li>
        <li key={bank}>Bank: {bank}</li>
        <li key={accountNumber}>Account #: {accountNumber}</li>
        <li key={routingNumber}>Routing #: {routingNumber}</li>
        <li key={balance}>Balance: {balance}</li>
      </ul>
    </main>
  );
};

export default AccountDetailsPage;
