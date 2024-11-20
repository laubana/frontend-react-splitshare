import React from "react";

const Close = ({ width = 24, height = 24, fill = "black", ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      stroke={fill}
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="none" stroke-width={2} d="M3,3 L21,21 M3,21 L21,3" />
    </svg>
  );
};

export default Close;
