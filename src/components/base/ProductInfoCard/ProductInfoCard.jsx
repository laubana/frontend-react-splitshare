import React from "react";
import Typography from "../Typography/Typography";
import styles from "./ProductInfoCard.module.css";

function ProductInfoCard({
  title,
  price,
  quantity,
  date,
  name,
  address,
  ...props
}) {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.grid}`}>
        <Typography variant="h2-graphik-bold" color="dark-blue">
          {title}
        </Typography>
        <div className={`${styles.flex}`}>
          <Typography variant="h2-graphik-bold">$ {price}</Typography>
          <Typography variant="body-1-medium" color="gray">
            {quantity} available
          </Typography>
        </div>
        <Typography variant="body-2-regular" color="gray">
          Posted{" "}
          {date === 0
            ? "today"
            : 1 < date
            ? `${date} days ago`
            : `${date} day ago`}{" "}
          by <span style={{ fontWeight: "bold" }}>{name}</span>
        </Typography>
      </div>
    </div>
  );
}

export default React.memo(ProductInfoCard);
