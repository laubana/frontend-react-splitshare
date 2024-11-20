import React, { useEffect, useState } from "react";
import NumberInput from "./NumberInput";

export default {
  title: "Base/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
};

export const Base = () => {
  const [inputNumber, setInputNumber] = useState(0);

  useEffect(() => {
    console.log(inputNumber);
  }, [inputNumber]);

  return (
    <NumberInput
      inputNumber={inputNumber}
      setInputNumber={setInputNumber}
      maxValue={10}
    ></NumberInput>
  );
};
