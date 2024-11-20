import React from "react";
import Typography from "../Typography/Typography";
import styles from "./badge.module.css";
import useHover from "../../../utils/useHover";

const Badge = (props) => {
  const { label, active } = props;
  const [hoverRef, isHovering] = useHover();

  return (
    <div
      ref={hoverRef}
      className={`${styles.wrapper} ${active ? styles.selected : ""}`}
      {...props}
    >
      <Typography
        style={isHovering ? { color: "white" } : { color: "black" }}
        variant="button-semibold"
      >
        {label}
      </Typography>
    </div>
  );
};

export default React.memo(Badge);
