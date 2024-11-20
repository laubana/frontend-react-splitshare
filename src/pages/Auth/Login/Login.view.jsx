import { Formik, Form } from "formik";
import FormikControl from "../../../components/base/FormikControl/FormikControl";
import Button from "./../../../components/base/Button/Button";
import style from "./Login.module.css";
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
import Grid from "../../../components/layout/Grid/Grid";

const LoginView = (props) => {
  const { initialValues, validationSchema, loginWithGoogle, onSubmit, lg, xl } =
    props;
  const navigate = useNavigate();
  return (
    <div className={style.loginWrapper}>
      <LoginLogoSVG />

      <Grid columns={lg ? 2 : 1} rows={2} gap={lg ? "15rem" : 0}>
        <div className={style.leftIcons}>
          {lg ? (
            <>
              {xl && (
                <LeftHandSVG
                  width={300}
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    transform: "translate(-15%, 0%)",
                  }}
                />
              )}
              <RightHandSVG
                style={{
                  position: "absolute",
                  top: "0",
                  transform: "translate(90%, -70%)",
                }}
              />

              <BottomHandSVG
                height={"auto"}
                width={300}
                style={{
                  position: "absolute",
                  top: "0",
                  transform: "translate(10%, 180%)",
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

        <div style={{ gridRow: "1/-1", gridColumn: "2/3" }}>
          {!lg && <LoginLogoSVG />}
          <div className={style.formikContainer}>
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
                      label="Email"
                      name="email"
                      placeholder="Type your email"
                      style={{
                        borderRadius: "12px",
                        padding: "6px 16px",
                        minWidth: "289px",
                      }}
                    />
                    <FormikControl
                      control="input"
                      type="password"
                      label="Password"
                      name="password"
                      placeholder="Type your password"
                      style={{
                        borderRadius: "12px",
                        padding: "6px 16px",
                        minWidth: "289px",
                      }}
                    />
                    <div className={style.buttonWrapper}>
                      <Button
                        variant="white"
                        size="md"
                        label="Back"
                        hoverable
                        onClickHandler={() => navigate("/")}
                      />
                      <Button
                        variant="yellow"
                        size="md"
                        label="Log In"
                        hoverable
                        disable={!formik.isValid}
                        type="submit"
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className={style.bottom}>
            <Typography variant="h4-graphik-bold" color="white">
              Or log in with
            </Typography>
            <div
              className={style.svg}
              onClick={loginWithGoogle}
              style={{ cursor: "pointer" }}
            >
              <GoogleSVG />
            </div>
            <div className={style.createAcct}>
              <Typography variant="body-2-regular" color="white">
                Don't have an account?
              </Typography>
              <Link to="/register">
                <Typography
                  variant="body-2-regular"
                  color="white"
                  style={{ textDecoration: "underline", fontWeight: "bold" }}
                >
                  Create one!
                </Typography>
              </Link>
            </div>
          </div>
        </div>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default LoginView;
