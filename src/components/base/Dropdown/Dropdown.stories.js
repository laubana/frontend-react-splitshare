import React, { useEffect, useMemo, useState } from "react";
import Dropdown from "./Dropdown";

export default {
  title: "Base/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
};

export const Base = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const options = useMemo(
    () => [
      { value: "value1", label: "label1" },
      { value: "value2", label: "label2" },
      { value: "value3", label: "label3" },
    ],
    []
  );

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);

  return (
    <Dropdown
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      options={options}
    ></Dropdown>
  );
};
