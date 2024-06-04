"use client";
import { UserButton, useUser } from "@clerk/nextjs";

import Link from "next/link";
import classes from "./Navbar.module.css";

export default function Navbar() {
  const { user, isLoaded } = useUser();

  return (
    <header className={classes.header}>
      <nav className={classes.navbar}>
        <div className={classes.home}>
          <Link href="/">Bb</Link>
        </div>
        <ul className={classes.links}>
          {isLoaded && user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <UserButton afterSignOutUrl="/"/>
            </>
          ) : undefined}
        </ul>
      </nav>
    </header>
  );
}
