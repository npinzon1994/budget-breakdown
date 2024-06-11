"use client";

import Image from "next/image";
import classes from "./IconGrid.module.css";
import ImagePicker from "../ImagePicker";
import { FC } from "react";

type Props = {
  icons: string[];
  label: string;
  name: string;
};

const IconGrid: FC<Props> = ({ icons, label, name }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <ul className={classes.grid}>
        {icons.map((icon, index) => (
          <li key={index}>
            <Image
              src={`https://budget-breakdown-account-images.s3.us-east-2.amazonaws.com/${icon}`}
              alt={`${icon} icon`}
              fill
            />
            <input type="radio" />
          </li>
        ))}
        <ImagePicker name={name} />
      </ul>
    </div>
  );
};

export default IconGrid;
