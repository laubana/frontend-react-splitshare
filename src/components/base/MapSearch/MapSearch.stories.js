import MapSearch from "./MapSearch";

MapSearch.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: "md",
  onClick: () => {
    console.log("Button");
  },
};
export default {
  title: "Base/MapSearch",
  component: MapSearch,
  tags: ["autodocs"],
};

export const SearchLocation = {};
