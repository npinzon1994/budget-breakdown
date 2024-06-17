"use client";

import Image from "next/image";
import classes from "./SubNavigation.module.css";
import { usePathname } from "next/navigation";
import rightArrow from "../../assets/arrow-rounded-corners.svg";
import Link from "next/link";
import { kebabToCapitalizedFirstLetter } from "src/util/kebab-case";
import { useAppSelector } from "src/lib/store/hooks";
import { useEffect } from "react";

const SubNavigation = () => {
  const currentAccount = useAppSelector(
    (state) => state.account.currentAccount
  );

  const url = usePathname();
  const routes = [...url.split("/")];
  routes.shift(); //removes first element -- ""

  const displayedRoutes = [];
  for (let i = 0; i < routes.length; i++) {
    displayedRoutes.push(
      <li key={routes[i]} className={classes["list-item"]}>
        <Link href="" className={classes.link}>
          {kebabToCapitalizedFirstLetter(routes[i])}
        </Link>
      </li>
    );

    if (i < routes.length - 1) {
      displayedRoutes.push(
        <li key={i}>
          <Image
            src={rightArrow}
            alt="right facing arrow"
            className={classes["right-arrow"]}
          />
        </li>
      );
    }
  }

  if (
    currentAccount &&
    routes.length === 3 &&
    routes[0] === "dashboard" &&
    routes[1] === "accounts"
  ) {
    displayedRoutes.splice(
      -1,
      1,
      <li key={routes[2]} className={classes["list-item"]}>
        <Link href="" className={classes.link}>
          {currentAccount?.nickName}
        </Link>
      </li>
    );
  }

  // console.log(routes);
  // console.log(displayedRoutes);

  return (
    <header className={classes.header}>
      <ul className={classes["sub-navigation"]}>{displayedRoutes}</ul>
    </header>
  );
};

export default SubNavigation;
