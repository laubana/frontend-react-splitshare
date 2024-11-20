import { useState } from "react";
import DatePicker from "./DatePicker";

export default {
  title: "Base/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  args: {
    date: "",
    setDate: (date) => {
      console.log(date);
    },
  },
  argTypes: {},
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = (props) => {
  const [date, setDate] = useState("");

  return (
    <div>
      <DatePicker date={date} setDate={setDate}></DatePicker>
      <div>{date}</div>
    </div>
  );
};
