import React from "react";
import Select from "react-dropdown-select";
import "./selectDropdown.css";

const SelectDropdown = (props) => {
  const style = {
    borderRadius: "12px",
    height: "32px",
    width: "100%",
    paddingLeft: "15px",
    border: "2px solid var(--black)",
    backgroundColor: "var(--white)",
    zIndex: "50",
    minWidth: "250px",
  };

  return (
    <div>
      <Select {...props} style={style} dropdownGap={0} dropdownHeight="300px" />
    </div>
  );
};

export default React.memo(SelectDropdown);
