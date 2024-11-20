import React from "react";

const TimeSVG = ({ width, height, fill, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width} //20
      height={height} //20
      fill={fill} //none
      {...props}
    >
      <path
        fill={fill} //black
        d="M10.5 4.37a.5.5 0 1 0-1 0h1Zm-.5 5.98h-.5a.5.5 0 0 0 .242.429L10 10.35Zm2.713 2.209a.5.5 0 1 0 .514-.858l-.514.858ZM18.48 10A8.48 8.48 0 0 1 10 18.48v1A9.48 9.48 0 0 0 19.48 10h-1ZM10 18.48A8.48 8.48 0 0 1 1.52 10h-1A9.48 9.48 0 0 0 10 19.48v-1ZM1.52 10A8.48 8.48 0 0 1 10 1.52v-1A9.48 9.48 0 0 0 .52 10h1ZM10 1.52A8.48 8.48 0 0 1 18.48 10h1A9.48 9.48 0 0 0 10 .52v1Zm-.5 2.85v5.98h1V4.37h-1Zm.242 6.409 2.97 1.78.515-.858-2.97-1.78-.514.858Z"
      />
    </svg>
  );
};

export default TimeSVG;
