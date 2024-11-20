import React from "react";

const NoImage = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      id="Layer_1"
      x={0}
      y={0}
      style={{
        enableBackground: "new 0 0 300 300",
      }}
      viewBox="0 0 300 300"
      {...props}
    >
      <style>
        {
          '.st1{fill:none;stroke:#58595b;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}.st3{fill:#58595b}.st4{font-family:"Graphik-Semibold"}.st5{font-size:20px}'
        }
      </style>
      <path
        d="M0 0h300v300H0z"
        style={{
          fill: "#bfc1c4",
        }}
      />
      <path
        d="M135.6 143.19a3.92 3.92 0 0 1-3.92-3.92V98.06a3.92 3.92 0 0 1 3.92-3.92h47.14a3.92 3.92 0 0 1 3.92 3.92v26.28"
        className="st1"
      />
      <path
        d="M135.6 143.19a3.92 3.92 0 0 1-3.92-3.92V98.06a3.92 3.92 0 0 1 3.92-3.92h47.14a3.92 3.92 0 0 1 3.92 3.92V139.18c0 2.22-1.8 4.01-4.01 4.01H135.6zM186.66 124.33v14.84"
        className="st1"
      />
      <path d="m186.48 135.41-20.99-20.72-29.23 28.5" className="st1" />
      <circle
        cx={146.36}
        cy={109.71}
        r={4.98}
        style={{
          fill: "none",
          stroke: "#58595b",
          strokeWidth: 4,
          strokeMiterlimit: 10,
        }}
      />
      <path
        d="M125.62 153.47a3.92 3.92 0 0 1-3.92-3.92v-41.21a3.92 3.92 0 0 1 3.92-3.92"
        className="st1"
      />
      <path
        d="M176.68 143.19v6.27c0 2.22-1.8 4.01-4.01 4.01h-47.05a3.92 3.92 0 0 1-3.92-3.92v-41.21a3.92 3.92 0 0 1 3.92-3.92h6.06"
        className="st1"
      />
      <text transform="translate(105.03 188.153)">
        <tspan x={0} y={0} className="st3 st4 st5">
          {"No Image"}
        </tspan>
        <tspan x={1.46} y={24} className="st3 st4 st5">
          {"Available"}
        </tspan>
      </text>
    </svg>
  );
};

export default NoImage;
