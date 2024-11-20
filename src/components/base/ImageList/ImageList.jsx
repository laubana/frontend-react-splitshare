import React from "react";
import "react-toastify/dist/ReactToastify.css";
import styles from "./ImageList.module.css";

function ImageList({ images, mode = "horizontal", onClick, ...props }) {
  return (
    <div
      className={`${styles["wrapper"]} ${styles[mode]}`}
      style={
        mode === "vertical" && 1 < images.length
          ? { gridTemplateColumns: `3fr repeat(1, 1fr)` }
          : null
      }
    >
      {images.slice(0, 3).map((image, index) => (
        <div className={`${styles["item"]}`} key={index} onClick={onClick}>
          <img src={image} alt="" className={`${styles["image"]}`} />
        </div>
      ))}
      {3 < images.length && (
        <div className={`${styles["item"]}`} onClick={onClick}>
          <img src={images[3]} alt="" className={`${styles["image"]}`} />
          <div className={`${styles["more-wrapper"]}`}>
            <div>+ {images.length - 3}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(ImageList);
