"use client";

import classes from "./ImagePicker.module.css";
import { ChangeEvent, FC, useRef, useState } from "react";
import Image from "next/image";
import accountPlaceholder from "../../assets/account-placeholder.png";

type Props = {
  name: string;
  label: string;
  userIcon?: string;
  // activeIcon: string | undefined;
};

const ImagePicker: FC<Props> = ({ name, label, userIcon }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [icon, setIcon] = useState<string | null>(userIcon ? `https://budget-breakdown-account-images.s3.us-east-2.amazonaws.com/${userIcon}` : null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleIconChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target?.files && target.files.length > 0) {
      const file = target.files[0];
      console.log("Current File: ", file);

      const fileReader = new FileReader();
      fileReader.onload = () => {
        //onLoad gets triggered once readAsDataURL is finished executing
        const URL = fileReader.result;
        if (typeof URL === "string") {
          console.log("icon URL: ", URL);
          setIcon(URL);
        }
      };
      fileReader.readAsDataURL(file);
    } else {
      console.log("Resetting icon to null...");
      setIcon(null);
    }
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <div className={classes.container}>
        <div className={classes.preview}>
          {icon ? (
            <Image src={icon} alt="account icon selected by the user" fill />
          ) : (
            <Image
              src={accountPlaceholder}
              alt="account icon selected by the user"
              fill
            />
          )}
        </div>
        <div className={classes.controls}>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/JPEG, image/JPG, image/heic, image/HEIC, image/webp, image/WEBP"
            className={classes.input}
            id={name}
            name={name}
            ref={inputRef}
            onChange={handleIconChange}
          />
          <button
            className={classes.button}
            type="button"
            onClick={handleClick}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default ImagePicker;
