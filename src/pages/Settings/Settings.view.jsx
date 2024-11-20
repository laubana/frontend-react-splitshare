import React from "react";
import Accordion from "../../components/base/Accordion/Accordion";
import Typography from "../../components/base/Typography/Typography";
import { Formik, Form } from "formik";
import FormikControl from "../../components/base/FormikControl/FormikControl";
import Button from "../../components/base/Button/Button";
import style from "./Settings.module.css";
import { ToastContainer } from "react-toastify";
import MapSearch from "../../components/base/MapSearch/MapSearch";
import SingleImageInput from "../../components/base/SingleImageInput/SingleImageInput";

const Settings = (props) => {
  const {
    profileVisibility,
    passwordVisibility,
    aboutUsVisibility,
    singleImage,
    setSingleImage,
    setProfileVisibility,
    setPasswordVisibility,
    setAboutUsVisibility,
    changePasswordValues,
    validatePasswordSchema,
    onSubmitNewPassword,
    changeContactValues,
    onSubmitUpdateInfo,
    addressInfo,
    resetAddressInfo,
  } = props;

  const formikStyle = {
    borderRadius: "12px",
    padding: "6px 16px",
    minWidth: "289px",
  };

  return (
    <div id={style.settings}>
      <div className={style.titleWrapper}>
        <Typography variant="h2-graphik-bold">Settings</Typography>
      </div>
      <div className={style.settingsItem}>
        <Accordion
          visibility={profileVisibility}
          onToggle={() => setProfileVisibility(!profileVisibility)}
          label="Update Profile"
          id="profile"
        >
          <hr></hr>
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
              Update Photo
            </Typography>
          </div>
          <div className={style.settingsDetail}>
            <Formik
              initialValues={changeContactValues}
              onSubmit={onSubmitUpdateInfo}
              enableReinitialize
            >
              {(formik) => {
                return (
                  <Form>
                    <FormikControl
                      control="input"
                      type="text"
                      label="Contact Number"
                      name="contactNumber"
                      placeholder="Type your number"
                      style={formikStyle}
                    />
                    <div>
                      <Typography
                        variant="h4-graphik-bold"
                        style={{ paddingBottom: "8px" }}
                      >
                        Address
                      </Typography>
                      <MapSearch
                        placeholder="Type your address"
                        newValue={addressInfo}
                        resetAddressInfo={resetAddressInfo}
                      />
                    </div>
                    <div className={"buttonWrapper"}>
                      <Button
                        variant="yellow"
                        size="lg"
                        label="Apply Changes"
                        type="submit"
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Accordion>
      </div>
      <div className={style.settingsItem}>
        <Accordion
          visibility={passwordVisibility}
          onToggle={() => setPasswordVisibility(!passwordVisibility)}
          label="Change Password"
          id="password"
        >
          <hr></hr>
          <div className={style.settingsDetail}>
            <Formik
              initialValues={changePasswordValues}
              validationSchema={validatePasswordSchema}
              onSubmit={onSubmitNewPassword}
            >
              {(formik) => {
                return (
                  <Form>
                    <FormikControl
                      control="input"
                      type="password"
                      label="Current Password"
                      name="password"
                      placeholder="Enter your current password"
                      style={formikStyle}
                    />
                    <FormikControl
                      control="input"
                      type="password"
                      label="New Password*"
                      name="newPassword"
                      placeholder="Type your new password"
                      style={formikStyle}
                    />
                    <FormikControl
                      control="input"
                      type="password"
                      label="Confirm New Password*"
                      name="confirmNewPassword"
                      placeholder="Confirm your new password"
                      style={formikStyle}
                    />
                    <div className={"buttonWrapper"}>
                      <Button
                        variant="yellow"
                        type="submit"
                        size="lg"
                        label="Change Password"
                        hoverable
                        disable={!formik.isValid}
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Accordion>
      </div>
      <div className={style.settingsItem}>
        <Accordion
          visibility={aboutUsVisibility}
          onToggle={() => setAboutUsVisibility(!aboutUsVisibility)}
          label="About SplitShare"
          id="aboutUs"
        >
          <hr />
          <Typography variant="body-2-regular">
            Our goal here at SplitShare is to grow a platform where members can
            come together and help each other save by finding, sharing, and
            splitting good deals. Through our platform, we hope that everyone
            can make the most out of their purchases and collectively maximize
            their savings.
          </Typography>
          <Typography variant="body-3-medium">
            Copyright © 2023 Team Chopsticks 2.0
          </Typography>
        </Accordion>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Settings;
