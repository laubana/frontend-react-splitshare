import React from "react";

const OrderSVG = ({ width = 22, height = 23, fill, stroke, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width} //22
      height={height} //23
      fill="none"
      viewBox="0 0 22 23"
    >
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20.79 5.618l-9.82 3.958m9.82-3.958l-9.82-3.959-9.81 3.959m19.63 0V17.7l-9.82 3.958m0-12.083L1.16 5.618m9.81 3.958V21.66M1.16 5.618V17.7l9.81 3.958m4.91-8.595V7.597L6.07 3.638"
      ></path>
    </svg>
  );
};

export default OrderSVG;
