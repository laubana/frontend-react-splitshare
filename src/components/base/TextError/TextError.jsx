import React from "react";
import Typography from "../Typography/Typography";

function TextError(props) {
  return (
    <Typography
      variant="body-4-regular"
      color="error"
      style={{ paddingTop: "8px" }}
    >
      {props.children}
    </Typography>
  );
}

export default React.memo(TextError);
