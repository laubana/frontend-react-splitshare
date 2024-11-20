import React from "react";

const HomeSVG = ({ width, height, fill, stroke, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width} //26
      height={height} //23
      fill="none"
      viewBox="0 0 26 23"
    >
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M24.751 12.047L13.319 1.66 1.899 12.047m2.937-2.682V21.66h5.716v-7.767h5.558v7.767h5.57V9.365"
      ></path>
    </svg>
  );
};

export default HomeSVG;
