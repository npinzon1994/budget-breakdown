"use client";

import Link from "next/link";
import classes from "./Sidebar.module.css";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();

  return (
    <nav className={classes.sidebar}>
      <ul className={classes.list}>
        <li key="home" className={classes["list-item"]}>
          <Link
            className={`${classes.link} ${
              path === "/dashboard" ? classes.active : undefined
            }`}
            href="/dashboard"
          >
            Home
          </Link>
        </li>
        <li key="accounts" className={classes["list-item"]}>
          <Link
            className={`${classes.link} ${
              path.startsWith("/dashboard/accounts")
                ? classes.active
                : undefined
            }`}
            href="/dashboard/accounts"
          >
            Accounts
          </Link>
        </li>
        <li key="bills" className={classes["list-item"]}>
          <Link
            className={`${classes.link} ${
              path.startsWith("/dashboard/bills") ? classes.active : undefined
            }`}
            href="/dashboard/bills"
          >
            Bills
          </Link>
        </li>
        <li key="payments" className={classes["list-item"]}>
          <Link
            className={`${classes.link} ${
              path.startsWith("/dashboard/payments")
                ? classes.active
                : undefined
            }`}
            href="/dashboard/payments"
          >
            Payments
          </Link>
        </li>
        <li key="reports" className={classes["list-item"]}>
          <Link
            className={`${classes.link} ${
              path.startsWith("/dashboard/reports") ? classes.active : undefined
            }`}
            href="/dashboard/reports"
          >
            Reports
          </Link>
        </li>
        <li key="transfer" className={classes["list-item"]}>
          <Link
            className={`${classes.link} ${
              path.startsWith("/dashboard/transfer")
                ? classes.active
                : undefined
            }`}
            href="/dashboard/transfer"
          >
            Transfer
          </Link>
        </li>
      </ul>
    </nav>
  );
}
