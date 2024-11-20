import Button from "./Button";

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: "md",
  onClick: () => {
    console.log("Button");
  },
};

export default {
  title: "Base/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    label: "Button",
  },
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    primary: true,
    onClick: () => console.log("this.props.primary"),
  },
};

export const Secondary = {};

export const Large = {
  args: {
    size: "lg",
  },
};

export const Small = {
  args: {
    size: "sm",
  },
};
export const Red = {
  args: {
    size: "sm",
    backgroundColor: "red",
  },
  argTypes: {
    backgroundColor: {
      control: "inline-radio",
      options: ["red", "green", "blue"],
    },
  },
};
