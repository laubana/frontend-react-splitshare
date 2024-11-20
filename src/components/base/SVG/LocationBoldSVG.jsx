import React from "react";

const LocationSVG = ({ width, height, fill, stroke, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width} //26
      height={height} //23
      fill="none"
      viewBox="0 0 14 19"
      {...props}
    >
      <path
        d="M7.24 1C3.14 1 1 3.88 1 7.04C1 11.75 7.24 19.6 7.24 19.6C7.24 19.6 13.48 11.75 13.48 7.04C13.48 3.88 11.27 1 7.24 1Z"
        stroke="#404040"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M7.32 10.23C8.94924 10.23 10.27 8.90924 10.27 7.28C10.27 5.65076 8.94924 4.33 7.32 4.33C5.69076 4.33 4.37 5.65076 4.37 7.28C4.37 8.90924 5.69076 10.23 7.32 10.23Z"
        stroke="#404040"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LocationSVG;
