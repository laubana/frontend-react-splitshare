import React from "react";
import ImageLabel from "../ImageLabel/imageLabel";
import styles from "./activeListingCard.module.css";
import Typography from "../Typography/Typography";

const ActiveListingCard = (props) => {
  const {
    distance,
    days,
    source,
    itemname,
    price,
    stock,
    alt,
    width,
    height,
    ratio,
    onClick,
  } = props;
  return (
    <div {...props} className={styles.activeListingCard} onClick={onClick}>
      <div className={styles.box} style={{ width }}>
        {distance ? (
          <ImageLabel
            className={styles.boxTitle}
            distance={distance}
            days={days}
          />
        ) : (
          <></>
        )}
        <img
          src={source}
          alt={alt}
          style={{ height, width, aspectRatio: ratio, boxSizing: "border-box" }}
        />
      </div>
      <div>
        <div className={styles.item}>
          <Typography variant="h4-graphik-bold" color="dark-blue">
            {itemname}
          </Typography>
        </div>
        <div className={styles.itemPriceStock}>
          <Typography variant="h4-graphik-bold">${price}</Typography>
          <Typography variant="body-4-regular" color="gray">
            {stock} available
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ActiveListingCard);
