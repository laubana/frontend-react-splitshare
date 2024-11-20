import React from "react";
import styles from "./Card.module.css";

function Card({
  nopadding = false,
  noborder = false,
  noshadow = false,
  aspectRatio,
  children,
  style,
  ...props
}) {
  return (
    <div
      className={`${styles.card} ${!nopadding ? styles.padding : ""} ${
        !noborder ? styles.border : ""
      } ${!noshadow ? styles.shadow : ""}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default React.memo(Card);
