import Sidebar from "src/components/Navigation/Sidebar";
import classes from "./layout.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={classes.layout}>
      <Sidebar />
      {children}
    </section>
  );
}
