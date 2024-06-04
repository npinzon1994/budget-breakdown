import { SignUp } from "@clerk/nextjs";
import classes from "../../sign-in/[[...sign-in]]/page.module.css";

export default function Page() {
  return (
    <main className={classes.page}>
      <SignUp
        appearance={{
          elements: {
            rootBox: classes["root-box"],
            formButtonPrimary: classes["form-button-primary"],
            cardBox: classes["card-box"],
            card: classes.card,
            formFieldInput: classes.input,
            socialButtonsIconButton: classes["social-button"],
            footerActionLink: classes["sign-up-link"],
          },
        }}
      />
    </main>
  );
}
