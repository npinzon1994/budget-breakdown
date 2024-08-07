import classes from "./page.module.css";
import { FC } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { getAccountDetails } from "src/lib/accounts";
import AccountDetails from "src/components/Dashboard/Accounts/AccountDetails";
import { getTransactions } from "src/lib/transactions";
import Transactions from "src/components/Transactions/Transactions";

type Props = {
  params: { accountSlug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const AccountDetailsPage: FC<Props> = async ({ params }) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not signed in.");
  }

  const account = await getAccountDetails(user.id, params.accountSlug);

  if (!account || !account._id) {
    throw new Error("Account not found.");
  }

  const transactions = await getTransactions(account._id);

  return (
    <div className={classes.wrapper}>
      <AccountDetails account={account} transactions={transactions} />
      <Transactions transactions={transactions} />
    </div>
  );
};

export default AccountDetailsPage;
