import React from "react";
import { ArrowUp, ArrowDown } from "../SVG";
import Typography from "../Typography/Typography";
import styles from "./accordion.module.css";

const Accordion = ({ children, visibility, onToggle, id, label, ...props }) => {
  return (
    <>
      <div className={`${styles["wrapper"]}`}>
        <div className={`${styles["header"]}`} id={id} onClick={onToggle}>
          <Typography variant="h4-graphik-bold">{label}</Typography>
          {visibility ? (
            <ArrowUp width={24} height={24} fill="black" />
          ) : (
            <ArrowDown width={24} height={24} fill="black" />
          )}
        </div>
        <div
          className={`${styles["footer"]} ${
            visibility ? styles["expand"] : ""
          }`}
        >
          <div style={{ padding: "0 24px 32px" }}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Accordion);

