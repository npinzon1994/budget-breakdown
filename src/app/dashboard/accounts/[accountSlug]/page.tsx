import classes from "./page.module.css";
import { FC } from "react";

type PageProps = {
  params: { accountSlug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const AccountDetailsPage: FC<PageProps> = ({ params }) => {
  return (
    <main className={classes.page}>
      <h1>{params.accountSlug}</h1>
    </main>
  );
};

export default AccountDetailsPage;
