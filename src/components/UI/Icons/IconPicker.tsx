"use client";

import Image from "next/image";
import classes from "./IconPicker.module.css";
import ImagePicker from "../ImagePicker";
import { FC, useState, useRef, ChangeEvent } from "react";
import accountPlaceholder from "../../../assets/account-placeholder.png";

import amexIcon from "../../../assets/bank-icons/amex.png";
import bfcuIcon from "../../../assets/bank-icons/bfcu.jpg";
import boaIcon from "../../../assets/bank-icons/boa.jpeg";
import capitalOneIcon from "../../../assets/bank-icons/capital-one.png";
import citibankIcon from "../../../assets/bank-icons/citibank.png";
import citizensBankIcon from "../../../assets/bank-icons/citizens-bank.png";
import chaseIcon from "../../../assets/bank-icons/chase.webp";
import goldmanSachsIcon from "../../../assets/bank-icons/goldman-sachs.png";
import hsbcIcon from "../../../assets/bank-icons/hsbc.jpg";
import morganStanleyIcon from "../../../assets/bank-icons/morgan-stanley.jpg";
import pncIcon from "../../../assets/bank-icons/pnc.png";
import synchronyIcon from "../../../assets/bank-icons/synchrony.png";
import tdBankIcon from "../../../assets/bank-icons/td-bank.webp";
import wellsFargoIcon from "../../../assets/bank-icons/wells-fargo.svg";
import ImagePreview from "./ImagePreview";
import rightArrow from "../../../assets/arrow-rounded-corners.svg";

type Props = {
  icons?: string[];
  name: string;
  label: string;
  userIcon?: string;
  iconChanged?: boolean;
  onIconChange?: () => void;
};

const bankIcons = [
  amexIcon,
  bfcuIcon,
  boaIcon,
  capitalOneIcon,
  citibankIcon,
  citizensBankIcon,
  chaseIcon,
  goldmanSachsIcon,
  hsbcIcon,
  morganStanleyIcon,
  pncIcon,
  synchronyIcon,
  tdBankIcon,
  wellsFargoIcon,
];

const IconPicker: FC<Props> = ({
  icons,
  name,
  label,
  userIcon,
  iconChanged,
  onIconChange,
}) => {
  const defaultIcon =
    "https://budget-breakdown-account-images.s3.us-east-2.amazonaws.com/account-placeholder.png";

  const [isOpen, setIsOpen] = useState(false);
  const [displayIcon, setDisplayIcon] = useState(defaultIcon);
  const [selectedIcon, setSelectedIcon] = useState(amexIcon);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const userIconURL = `https://budget-breakdown-account-images.s3.us-east-2.amazonaws.com/${userIcon}`;

  const [uploadedIcon, setUploadedIcon] = useState<string | null>(
    userIcon ? userIconURL : null
  );

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAddNewIconButtonClick = () => {
    inputRef.current?.click();
  };

  const handleIconChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (iconChanged === false && onIconChange) {
      onIconChange();
    }
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
          setUploadedIcon(URL);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div className={classes.wrapper}>
      <label htmlFor={name}>{label}</label>
      <div className={classes["dropdown-button"]} onClick={handleToggle}>
        <ImagePreview
          icon={selectedIcon}
          alt={`${selectedIcon} icon`}
          className={classes["display-icon"]}
        />
        <div className={classes.arrow}>
          <Image src={rightArrow} alt="collapsed arrow" fill />
        </div>
      </div>
      {isOpen ? (
        <div className={classes["grid-wrapper"]}>
          <label htmlFor="custom-icon">Custom</label>
          <ul id="user-icons" className={classes.grid}>
            {icons
              ? icons.map((icon, index) => (
                  <li
                    key={icon}
                    className={
                      icon === selectedIcon ? classes.selected : undefined
                    }
                  >
                    <Image src={icon} alt={`${icon} icon`} fill />
                    <input
                      type="radio"
                      name="radioButton"
                      id="custom-icon"
                      className={classes["radio-button"]}
                      onClick={() => setSelectedIcon(icon)}
                    />
                  </li>
                ))
              : undefined}
            {uploadedIcon ? (
              <li key="preview" className={classes.preview}>
                <Image
                  src={uploadedIcon}
                  alt="account icon selected by the user"
                  fill
                />
              </li>
            ) : undefined}
            <li key="add-new-icon-button">
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
                className={classes["add-button"]}
                type="button"
                onClick={handleAddNewIconButtonClick}
              >
                +
              </button>
            </li>
          </ul>

          <div id="horizontal-line" style={{ borderTop: "solid 1px gray" }} />
          <label htmlFor="stock-icon">Stock</label>
          <ul id="stock-icons" className={classes.grid}>
            {bankIcons.map((icon, index) => (
              <li
                key={index}
                className={icon === selectedIcon ? classes.selected : undefined}
              >
                <input
                  type="radio"
                  name="radioButton"
                  id="stock-icon"
                  className={classes["radio-button"]}
                  onClick={() => setSelectedIcon(icon)}
                />
                <Image
                  src={icon}
                  alt={`${icon} icon`}
                  fill
                  className={classes.icon}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : undefined}
    </div>
  );
};

export default IconPicker;
