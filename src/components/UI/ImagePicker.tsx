"use client";

import classes from "./ImagePicker.module.css";
import { ChangeEvent, FC, useRef, useState } from "react";
import Image from "next/image";
import accountPlaceholder from "../../assets/account-placeholder.png";

type Props = {
  name: string;
  label: string;
};

const ImagePicker: FC<Props> = ({ name, label }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [icon, setIcon] = useState<string | null>("");

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleIconChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target?.files && target.files.length > 0) {
      const file = target.files[0];

      const fileReader = new FileReader();
      fileReader.onload = () => {
        //onLoad gets triggered once readAsDataURL is finished executing
        const URL = fileReader.result;
        if (typeof URL === "string") {
          setIcon(URL);
        }
      };
      fileReader.readAsDataURL(file);
    }
    setIcon(null);
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
