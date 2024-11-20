import { Formik, Form } from "formik";
import FormikControl from "../../../components/base/FormikControl/FormikControl";
import Button from "./../../../components/base/Button/Button";
import style from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Typography from "../../../components/base/Typography/Typography";
import {
  BottomHandSVG,
  BuySplitShareSVG,
  GoogleSVG,
  LeftHandSVG,
  LoginLogoSVG,
  RightHandSVG,
} from "../../../components/base/SVG";
import SingleImageInput from "../../../components/base/SingleImageInput/SingleImageInput";
import Grid from "../../../components/layout/Grid/Grid";
import MapSearch from "../../../components/base/MapSearch/MapSearch";

const RegisterView = (props) => {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    singleImage,
    setSingleImage,
    lg,
    navigate,
  } = props;

  const formikStyle = {
    borderRadius: "12px",
    padding: "6px 16px",
    minWidth: "289px",
  };

  return (
    <div className={style.loginWrapper}>
      <Grid
        columns={lg ? 2 : 1}
        gap={lg ? "15rem" : 0}
        style={{ alignItems: "center" }}
      >
        <div className={style.leftIcons}>
          {lg ? (
            <>
              <LeftHandSVG
                width={300}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  transform: "translate(-15%, 100%)",
                }}
              />
              <RightHandSVG
                style={{
                  position: "absolute",
                  top: "0",
                  transform: "translate(100%, 10%)",
                }}
              />

              <BottomHandSVG
                height={"auto"}
                width={300}
                style={{
                  position: "absolute",
                  top: "0",
                  transform: "translate(10%, 310%)",
                }}
              />
            </>
          ) : (
            <></>
          )}
          <div className={style.siteTitle}>
            {lg && <BuySplitShareSVG style={{ textAlign: "center" }} />}
            <LoginLogoSVG />
          </div>
        </div>

        <div className={style.formikContainer}>
          <Typography
            variant="h3-graphik-bold"
            style={{ alignSelf: "center", paddingBottom: "1rem" }}
          >
            Create Account
          </Typography>

          <div className={style.imageUpload}>
            <SingleImageInput
              images={singleImage}
              setImages={setSingleImage}
              disableLabel
            />
            <Typography
              color="gray"
              variant="body-2-regular"
              style={{ textAlign: "center" }}
            >
              Upload Photo
            </Typography>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <FormikControl
                    control="input"
                    type="email"
                    label="Email*"
                    name="email"
                    placeholder="Type your email"
                    style={formikStyle}
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="First Name*"
                    name="firstName"
                    placeholder="Type your first name"
                    style={formikStyle}
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="Last Name*"
                    name="lastName"
                    placeholder="Type your last name"
                    style={formikStyle}
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    label="Password*"
                    name="password"
                    placeholder="Type your password"
                    style={formikStyle}
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    label="Confirm Password*"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    style={formikStyle}
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="Contact Number*"
                    name="contactNumber"
                    placeholder="Type your number"
                    style={formikStyle}
                  />
                  {/* <div>
                    <Typography
                      variant="h4-graphik-bold"
                      style={{ paddingBottom: "8px" }}
                    >
                      Address
                    </Typography>
                    <MapSearch placeholder="Type your address" />
                  </div> */}
                  <div className={style.buttonWrapper}>
                    <Button
                      variant="white"
                      size="md"
                      label="Back"
                      hoverable
                      onClickHandler={() => navigate("/login")}
                    />
                    <Button
                      variant="yellow"
                      type="submit"
                      size="md"
                      label="Create Account"
                      hoverable
                      disable={!formik.isValid}
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
          <div>
            <ToastContainer position="top-center" />
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default RegisterView;
