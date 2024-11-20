import React from "react";
import InputField from "../InputField/InputField";
import TextArea from "../TextArea/TextArea";

function FormikControl(props) {
  const { control, icon, ...rest } = props;
  switch (control) {
    case "input":
      return (
        <InputField
          {...rest}
        />
      );
    case "textarea":
      return <TextArea {...rest} />;
    default:
      return null;
  }
}

export default React.memo(FormikControl);
