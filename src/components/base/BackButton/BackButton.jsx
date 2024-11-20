import React from "react";
import styles from "./backButton.module.css";
import Typography from "./../Typography/Typography"

const BackButton = ({
  label = <Typography variant="h4-graphik-bold" color="dark-blue">{"< Back"}</Typography>,
  onClickHandler,
  children,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${styles["back-button"]}
      }`}
      onClick={onClickHandler}
      {...props}
    >
      {label ? label : children}
    </button>
  );
};

export default React.memo(BackButton);
