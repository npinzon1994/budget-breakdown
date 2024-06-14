import classes from "./page.module.css";
import { FC } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { getAccountDetails } from "src/lib/accounts";
import AccountDetails from "src/components/Dashboard/Accounts/AccountDetails";

type PageProps = {
  params: { accountSlug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const AccountDetailsPage: FC<PageProps> = async ({ params }) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not signed in.");
  }

  const account = await getAccountDetails(user.id, params.accountSlug);

  return (
    <main className={classes.page}>
      <AccountDetails account={account} />
    </main>
  );
};

export default AccountDetailsPage;
