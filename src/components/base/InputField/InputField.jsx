import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError/TextError";
import Typography from "../Typography/Typography";

function InputField(props) {
  const { label, name, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>
        <Typography variant="h4-graphik-bold" style={{ paddingBottom: "8px" }}>
          {label}
        </Typography>
      </label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default React.memo(InputField);
