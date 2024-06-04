import Link from "next/link";
import classes from "./page.module.css";
import { currentUser } from "@clerk/nextjs/server";

export default async function HomePage() {
  const user = await currentUser();
  if (user) {
    console.log(user.id);
    console.log(user.firstName, user.lastName);
  }

  return (
    <main className={classes.page}>
      <div className={classes["page-content"]}>
        <div className={classes["title-container"]}>
          <h1>Budget Breakdown</h1>
          <h2>Take control of your finances.</h2>
        </div>
        <div className={classes.links}>
          <Link href="/sign-in">Sign In</Link>
          <p>OR</p>
          <Link href="/sign-up">Create New Account</Link>
        </div>
      </div>
    </main>
  );
}
