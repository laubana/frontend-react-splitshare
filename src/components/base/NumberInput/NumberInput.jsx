import React, { useState } from "react";
import { Minus, Plus } from "../SVG";
import Typography from "../Typography/Typography";
import styles from "./NumberInput.module.css";

const NumberInput = ({
  inputNumber,
  setInputNumber,
  justify = "left",
  minValue = 0,
  maxValue = 1000,
  nanErrMsg,
  minErrMsg,
  maxErrMsg,
  ...props
}) => {
  const [error, setError] = useState("");

  const handleOnChange = (input) => {
    if (isNaN(input)) {
      setError(nanErrMsg);
      setInputNumber(input);
    } else if (Number(input) < minValue) {
      setError(minErrMsg);
      setInputNumber(Number(input));
    } else if (maxValue < Number(input)) {
      setError(maxErrMsg);
      setInputNumber(Number(input));
    } else {
      setError("");
      setInputNumber(Number(input));
    }
  };

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.header}`} style={{ justifySelf: justify }}>
        <div
          className={`${styles.btn} ${styles.minus}`}
          onClick={() => {
            if (minValue <= inputNumber - 1) {
              handleOnChange(inputNumber - 1);
            }
          }}
        >
          <Minus width={16} height={16} />
        </div>
        <input
          className={`${styles.ipt}`}
          type="text"
          value={inputNumber}
          onChange={(event) => handleOnChange(event.target.value)}
        />
        <div
          className={`${styles.btn} ${styles.plus}`}
          onClick={() => {
            if (inputNumber + 1 <= maxValue) {
              handleOnChange(inputNumber + 1);
            }
          }}
        >
          <Plus width={16} height={16} />
        </div>
      </div>
      <div className={`${styles.footer}`} style={{ justifySelf: justify }}>
        {error && (
          <Typography
            variant="body-4-regular"
            color="error"
            style={{ paddingTop: "8px" }}
          >
            {error}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default React.memo(NumberInput);
