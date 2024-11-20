import React from "react";
import "./touchable.css";

const Touchable = (props) => {
  const {
    onClick,
    width,
    height,
    className,
    borderRadius,
    children,
    backgroundColor,
    color,
  } = props;

  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        backgroundColor,
        width,
        height,
        borderRadius,
        color,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default React.memo(Touchable);
