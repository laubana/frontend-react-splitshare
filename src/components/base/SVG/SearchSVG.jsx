import React from "react";

const SearchSVG = ({ width, height, fill, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      {...props}
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="m10.3 9.058 4.775 4.775-1.242 1.242L9.058 10.3a5.352 5.352 0 0 1-3.141 1.033 5.416 5.416 0 1 1 5.416-5.416c0 1.175-.391 2.25-1.033 3.141ZM5.917 2.167a3.745 3.745 0 0 0-3.75 3.75 3.745 3.745 0 0 0 3.75 3.75 3.745 3.745 0 0 0 3.75-3.75 3.745 3.745 0 0 0-3.75-3.75Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default SearchSVG;
