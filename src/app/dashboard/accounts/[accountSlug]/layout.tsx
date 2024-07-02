import classes from "./layout.module.css";

type Props = {
  children: React.ReactNode;
};

export default async function AccountDetailsLayout({ children }: Props) {

  return (
    <main className={classes.layout}>
      {children}
    </main>
  );
}
