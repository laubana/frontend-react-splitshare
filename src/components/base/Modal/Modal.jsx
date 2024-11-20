import React from "react";
import Close from "../SVG/Close";
import styles from "./Modal.module.css";

const Modal = ({
  width = "50vw",
  noBackground = false,
  visibility,
  onClose,
  children,
  ...props
}) => {
  return (
    <>
      {visibility && (
        <div className={`${styles["outer-background"]}`}>
          <div
            className={`${styles.wrapper} ${
              !noBackground ? styles["inner-background"] : null
            }`}
          >
            <div className={`${styles["btn-wrapper"]}`}>
              <Close
                width={24}
                height={24}
                fill="black"
                className={styles.btn}
                onClick={onClose}
              />
            </div>
            <div className={`${styles["content-wrapper"]} `}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Modal);
