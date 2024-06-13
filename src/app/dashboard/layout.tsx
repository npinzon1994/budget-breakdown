import Sidebar from "src/components/Navigation/Sidebar";
import classes from "./layout.module.css";
import React from "react";
import SubNavigation from "src/components/Navigation/SubNavigation";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <section className={classes.layout}>
      <Sidebar />
      <div className={classes["main-content-wrapper"]}>
        <SubNavigation />
        {children}
      </div>
    </section>
  );
}
