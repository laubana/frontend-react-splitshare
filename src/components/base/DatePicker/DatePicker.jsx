import React from "react";
import styles from "./date-picker.module.css";

const DatePicker = ({ date, setDate, ...props }) => {
  const handleOnChange = (event) => {
    const today = new Date();
    const todayDate = new Date(
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(today.getDate()).padStart(2, "0")}`
    );
    const inputDate = new Date(event.target.value);
    const tomorrowDate = new Date();
    tomorrowDate.setDate(today.getDate() + 1);

    if (todayDate < inputDate) {
      setDate(event.target.value);
    } else {
      setDate(
        `${tomorrowDate.getFullYear()}-${String(
          tomorrowDate.getMonth() + 1
        ).padStart(2, "0")}-${String(tomorrowDate.getDate()).padStart(2, "0")}`
      );
    }
  };

  const getCurrentDate = () => {
    const todayDate = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(todayDate.getDate() + 1);

    return `${tomorrowDate.getFullYear()}-${String(
      tomorrowDate.getMonth() + 1
    ).padStart(2, "0")}-${String(tomorrowDate.getDate()).padStart(2, "0")}`;
  };

  return (
    <div className={`${styles["wrapper"]}`}>
      <input
        className={`${styles["input"]}`}
        type="date"
        value={date}
        onChange={handleOnChange}
        style={props}
        min={getCurrentDate()}
      ></input>
    </div>
  );
};

export default React.memo(DatePicker);
