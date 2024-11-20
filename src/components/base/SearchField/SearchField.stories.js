import SearchField from "./SearchField";

export default {
  title: "Base/SearchField",
  component: SearchField,
  args: {
    placeholder: "What are you looking for?",
  },
};

export const Search = {
  args: {
    resetValue: () => console.log("this.props.primary"),
  },
};
