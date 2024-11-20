import React from "react";
import styles from "./time-picker.module.css";

const TimePicker = ({ time, setTime, ...props }) => {
  const handleOnChange = (event) => setTime(event.target.value);

  return (
    <div className={`${styles["wrapper"]}`}>
      <input
        className={`${styles["input"]}`}
        type="time"
        value={time}
        onChange={handleOnChange}
        style={props}
      ></input>
    </div>
  );
};

export default React.memo(TimePicker);
