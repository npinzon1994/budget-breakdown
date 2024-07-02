"use client";

import Image from "next/image";
import classes from "./SubNavigation.module.css";
import { usePathname } from "next/navigation";
import rightArrow from "../../assets/arrow-rounded-corners.svg";
import Link from "next/link";
import { kebabToCapitalizedFirstLetter } from "src/util/kebab-case";
import { useAppSelector } from "src/lib/store/hooks";
import slugify from "slugify";

const SubNavigation = () => {
  const currentAccount = useAppSelector(
    (state) => state.account.currentAccount
  );

  const slugifiedName = currentAccount
    ? slugify(currentAccount.nickName, { lower: true })
    : "";

  const url = usePathname();
  const routesFromUrl = [...url.split("/")];
  routesFromUrl.shift(); //removes first element -- ""
  console.log("Routes from URL: ", routesFromUrl);

  const capitalizedRoutes = routesFromUrl.map((route) =>
    kebabToCapitalizedFirstLetter(route)
  );
  console.log("Capitalized Routes (BEFORE SPLICE): ", capitalizedRoutes);

  const nameIndex = routesFromUrl.findIndex((route) => {
    return route.includes(slugifiedName);
  });
  console.log("NAME SLUG INDEX: ", nameIndex);

  if (currentAccount && !capitalizedRoutes.includes(currentAccount?.nickName)) {
    console.log("NOW REPLACING SLUG WITH NICKNAME (SPLICE)...");
    capitalizedRoutes.splice(nameIndex, 1, currentAccount?.nickName);
  }

  const displayedRoutes = [];
  for (let i = 0; i < capitalizedRoutes.length; i++) {
    displayedRoutes.push(
      <li key={capitalizedRoutes[i]} className={classes["list-item"]}>
        <Link href="" className={classes.link}>
          {capitalizedRoutes[i]}
        </Link>
      </li>
    );

    if (i < capitalizedRoutes.length - 1) {
      displayedRoutes.push(
        <li key={i + 100}>
          <Image
            src={rightArrow}
            alt="right facing arrow"
            className={classes["right-arrow"]}
          />
        </li>
      );
    }
  }
  console.log("LOOP FINISHED -- LIST ITEMS CREATED");
  console.log("Capitalized Routes (AFTER SPLICE): ", capitalizedRoutes);

  return (
    <header className={classes.header}>
      <ul className={classes["sub-navigation"]}>{displayedRoutes}</ul>
      {/* <p>{`CURRENT ACCOUNT: ${currentAccount?.nickName}`}</p>
      <p>{`NAME INDEX: ${nameIndex}`}</p> */}
    </header>
  );
};

export default SubNavigation;
