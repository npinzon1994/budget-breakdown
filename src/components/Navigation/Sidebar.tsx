"use client";

import Link from "next/link";
import classes from "./Sidebar.module.css";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();

  return (
    <nav className={classes.sidebar}>
      <ul className={classes.links}>
        <Link
          className={`${classes.link} ${
            path === "/dashboard" ? classes.active : undefined
          }`}
          href="/dashboard"
        >
          Home
        </Link>
        <Link
          className={`${classes.link} ${
            path.startsWith("/dashboard/accounts") ? classes.active : undefined
          }`}
          href="/dashboard/accounts"
        >
          Accounts
        </Link>
        <Link
          className={`${classes.link} ${
            path.startsWith("/dashboard/bills") ? classes.active : undefined
          }`}
          href="/dashboard/bills"
        >
          Bills
        </Link>
        <Link
          className={`${classes.link} ${
            path.startsWith("/dashboard/payments") ? classes.active : undefined
          }`}
          href="/dashboard/payments"
        >
          Payments
        </Link>
        <Link
          className={`${classes.link} ${
            path.startsWith("/dashboard/reports") ? classes.active : undefined
          }`}
          href="/dashboard/reports"
        >
          Reports
        </Link>
        <Link
          className={`${classes.link} ${
            path.startsWith("/dashboard/transfer") ? classes.active : undefined
          }`}
          href="/dashboard/transfer"
        >
          Transfer
        </Link>
      </ul>
    </nav>
  );
}
