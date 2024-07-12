"use client";

import Image from "next/image";
import classes from "./IconPicker.module.css";
import ImagePicker from "../ImagePicker";
import { FC, useState, useRef, ChangeEvent, useEffect } from "react";
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
import { saveIcon } from "src/lib/icons";

type Props = {
  name: string;
  label: string;
  userID: string;
  uploadedIcons?: (string | undefined)[];
  currentIcon?: string;
  iconChanged?: boolean;
  onIconChange?: () => void;
  onGetSelectedIcon: (icon: FormData) => void;
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
  name,
  label,
  userID,
  uploadedIcons,
  currentIcon,
  iconChanged,
  onIconChange,
  onGetSelectedIcon,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const currentIconURL = `https://budget-breakdown-account-images.s3.us-east-2.amazonaws.com/${currentIcon}`;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(amexIcon);
  const [uploadedIcon, setUploadedIcon] = useState<string | null>(
    currentIcon ? currentIconURL : null
  );

  useEffect(() => {
    const iconData = new FormData();
    iconData.append("selectedIcon", selectedIcon);
    if (selectedIcon) {
      onGetSelectedIcon(iconData);
    }
  }, [selectedIcon]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    console.log("UPLOADED ICONS -- ", uploadedIcons);
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

      if (!file) {
        return;
      }

      const form = new FormData();
      form.append("uploadedImage", file);

      console.log("Current File: ", file);
      console.log("FILE NAME: ", file.name);

      console.log("Triggering icon save...");

      //using then/catch so I don't need to use async/await
      saveIcon(form, userID)
        .then((savedIconURL) => {
          setSelectedIcon(
            `https://budget-breakdown-account-images.s3.us-east-2.amazonaws.com/${savedIconURL}`
          );
        })
        .catch((error) => {
          console.error("ERROR -- ", error);
        });
    }
  };

  return (
    <div className={classes.wrapper}>
      <label htmlFor={label}>{label}</label>
      <div
        className={classes["dropdown-button"]}
        onClick={handleToggle}
        id={label}
      >
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
            {uploadedIcons
              ? uploadedIcons.map((icon, index) => (
                  <li
                    key={icon}
                    className={
                      `https://budget-breakdown-account-images.s3.us-east-2.amazonaws.com/${icon}` ===
                      selectedIcon
                        ? classes.selected
                        : undefined
                    }
                  >
                    <Image
                      src={`https://budget-breakdown-account-images.s3.us-east-2.amazonaws.com/${icon}`}
                      alt={`${icon} icon`}
                      fill
                    />
                    <input
                      type="radio"
                      name={
                        `https://budget-breakdown-account-images.s3.us-east-2.amazonaws.com/${icon}` ===
                        selectedIcon
                          ? name
                          : "iconButton"
                      }
                      id="custom-icon"
                      className={classes["radio-button"]}
                      onClick={() =>
                        setSelectedIcon(
                          `https://budget-breakdown-account-images.s3.us-east-2.amazonaws.com/${icon}`
                        )
                      }
                    />
                  </li>
                ))
              : undefined}

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
                  name={
                    `https://budget-breakdown-account-images.s3.us-east-2.amazonaws.com/${icon}` ===
                    selectedIcon
                      ? name
                      : "iconButton"
                  }
                  id={icon}
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
