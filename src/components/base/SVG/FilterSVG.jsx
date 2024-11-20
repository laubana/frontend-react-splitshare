import React from "react";

const FilterSVG = ({ width, height, fill, selected, onClick, ...props }) => {
  let selectedStyles = {
    border: "2px solid var(--black)",
    backgroundColor: "var(--light-blue)",
    padding: "3px 5px",
    borderStyle: "inset",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };
  let foo = selected
    ? selectedStyles
    : { padding: "3px 5px", cursor: "pointer" };

  return (
    <div style={foo} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill={fill}
        viewBox="0 0 22 25"
      >
        <path
          fill={selected ? "var(--black)" : "var(--white)"}
          d="M7 3.353A1.333 1.333 0 107 6.02a1.333 1.333 0 000-2.667zm-3.773 0a4.001 4.001 0 017.546 0h9.56a1.333 1.333 0 110 2.667h-9.56a4 4 0 01-7.546 0h-1.56a1.333 1.333 0 010-2.667h1.56zm11.773 8a1.333 1.333 0 100 2.666 1.333 1.333 0 000-2.666zm-3.773 0a4 4 0 017.546 0h1.56a1.333 1.333 0 110 2.667h-1.56a4.001 4.001 0 01-7.546 0h-9.56a1.334 1.334 0 010-2.667h9.56zm-4.227 8a1.333 1.333 0 100 2.667 1.333 1.333 0 000-2.667zm-3.773 0a4.002 4.002 0 017.546 0h9.56a1.333 1.333 0 110 2.667h-9.56a4.001 4.001 0 01-7.546 0h-1.56a1.333 1.333 0 110-2.667h1.56z"
        ></path>
      </svg>
    </div>
  );
};

export default FilterSVG;
