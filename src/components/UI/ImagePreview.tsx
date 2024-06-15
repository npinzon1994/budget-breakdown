import Image from "next/image";
import classes from "./ImagePreview.module.css";
import accountPlaceholder from "../../assets/account-placeholder.png";
import { FC } from "react";

type Props = {
  icon: string | null;
  className?: string;
};

const ImagePreview: FC<Props> = ({ icon, className }) => {
  return (
    <div className={`${classes.preview} ${className}`}>
      {icon ? (
        <Image src={`https://budget-breakdown-account-images.s3.us-east-2.amazonaws.com/${icon}`} alt="account icon selected by the user" fill />
      ) : (
        <Image
          src={accountPlaceholder}
          alt="account icon selected by the user"
          fill
        />
      )}
    </div>
  );
};

export default ImagePreview;
