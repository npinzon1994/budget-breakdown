import Image from "next/image";
import classes from "./ImagePreview.module.css";
import { FC } from "react";

type Props = {
  icon: string;
  alt: string;
  className?: string;
};

const ImagePreview: FC<Props> = ({ icon, alt, className }) => {
  return (
    <div className={`${classes.preview} ${className}`}>
      <Image src={icon} alt={alt} fill />
    </div>
  );
};

export default ImagePreview;
