import React from "react";
import styles from "./DescriptionCard.module.css";
import Button from "./../Button/Button";
import Typography from "../Typography/Typography";

const DescriptionCard = ({
  description,
  nobutton = false,
  color,
  label,
  handleOnClick,
}) => {
  return (
    <div className={`${styles.wrapper}`}>
      <Typography variant="h3-graphik-bold">Description</Typography>
      <div style={{ display: "grid", gap: "20px" }}>
        <Typography variant="body-2-regular" color="gray">
          {description}
        </Typography>
        {nobutton ? (
          <></>
        ) : (
          <Button
            onClickHandler={handleOnClick}
            size="lg"
            variant={color}
            label={label}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(DescriptionCard);
