import Touchable from "./Touchable";
// import PropTypes from "prop-types";

// Touchable.propTypes = {
//   onClick: PropTypes.func,
//   width: PropTypes.string,
//   height: PropTypes.string,
//   className: PropTypes.string,
//   borderRadius: PropTypes.string,
//   children: PropTypes.node,
// };

Touchable.defaultProps = {
  onClick: () => {
    console.log("Touchable");
  },
};

export default {
  title: "Base/Touchable",
  component: Touchable,
  tags: ["autodocs"],
  args: {
    children: <div>I am a touchable</div>,
    borderRadius: "12px",
    color: "black",
  },
};

export const Primary = {};
