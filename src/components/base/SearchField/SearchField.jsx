import React, { useState } from "react";
import styles from "./searchField.module.css";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";

const SearchField = ({
  value,
  setValue,
  resetValue,
  onChange,
  placeholder,
  location,
  height = "32px",
  ...props
}) => {
  const [fill, setFill] = useState("9C9C9C");

  return (
    <div className={styles.inputContainer} style={{ height }}>
      {location ? (
        <CiLocationOn size="20px" color={fill} />
      ) : (
        <AiOutlineSearch size="20px" color={fill} />
      )}

      <input
        onFocus={() => setFill("black")}
        onBlur={() => setFill("9C9C9C")}
        type="text"
        placeholder={placeholder}
        className={styles.input}
        value={value}
        onChange={onChange}
        {...props}
      />

      <AiOutlineCloseCircle
        onClick={resetValue}
        size="20px"
        color={fill}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default React.memo(SearchField);
