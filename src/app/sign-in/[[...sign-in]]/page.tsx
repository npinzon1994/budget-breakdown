import { SignIn } from "@clerk/nextjs";
import classes from "./page.module.css";

export default function SignInPage() {
  return (
    <main className={classes.page}>
      <SignIn
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
