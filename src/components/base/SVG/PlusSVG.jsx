const PlusSVG = ({ width, height, fill, ...props }) => {
  const style = {
    border: "2px solid var(--black)",
    display: "inline-block",
    borderRadius: "100px",
    margin: "auto",
    textAlign: "center",
    backgroundColor: "var(--yellow)",
    boxShadow: "2px 3px 1px var(--black)",
    padding: "8px 8px 2px 8px",
  };

  return (
    <div style={style}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width} //25
        height={height} //26
        fill="none"
        viewBox="0 0 25 26"
      >
        <path
          fill={fill}
          fillRule="evenodd"
          d="M12.5.16c1.15 0 2.083.932 2.083 2.083v8.333h8.334a2.083 2.083 0 010 4.166h-8.334v8.334a2.083 2.083 0 11-4.166 0v-8.334H2.083a2.083 2.083 0 110-4.166h8.334V2.243c0-1.151.932-2.084 2.083-2.084z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};
export default PlusSVG;
