import React from "react";
import Typography from "../Typography/Typography";
import style from "./checkbox.module.css";

const Checkbox = ({
  selectedOptions,
  setSelectedOptions,
  options,
  ...props
}) => {
  const handleOnChange = (event) => {
    if (event.target.checked) {
      setSelectedOptions((oldOptions) => [...oldOptions, event.target.value]);
    } else {
      setSelectedOptions((oldOptions) =>
        oldOptions.filter((oldOption) => oldOption !== event.target.value)
      );
    }
  };

  return (
    <>
      {options.map((option, index) => {
        return (
          <div className={style.checkbox_wrapper} key={index} style={props}>
            <input
              className={style.checkbox}
              type="checkbox"
              value={option.value}
              onChange={handleOnChange}
            ></input>
            <Typography>{option.label}</Typography>
          </div>
        );
      })}
    </>
  );
};

export default React.memo(Checkbox);
