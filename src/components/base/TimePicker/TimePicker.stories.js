import { useState } from "react";
import TimePicker from "./TimePicker";

export default {
  title: "Base/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  args: {
    time: "",
    setDate: (time) => {
      console.log(time);
    },
  },
  argTypes: {},
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Base = (props) => {
  const [time, setTime] = useState("");

  return (
    <div>
      <TimePicker time={time} setTime={setTime}></TimePicker>
      <div>{time}</div>
    </div>
  );
};
