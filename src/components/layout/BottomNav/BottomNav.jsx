/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from "./bottomNav.module.css";
import { Link, useLocation } from "react-router-dom";
import PlusSVG from "../../base/SVG/PlusSVG";
import { HomeSVG, OrderSVG, ProfileSVG, SettingsSVG } from "../../base/SVG";
import Typography from "../../base/Typography/Typography";
import useMediaQuery from "../../../utils/useMediaQuery";
import { ToastContainer, toast } from "react-toastify";
import { UserAuth } from "../../../context/AuthContext";

const BottomNav = (props) => {
  const location = useLocation();
  const { user } = UserAuth();

  const darkblue = "var(--dark-blue)";
  const lightgray = "var(--light-gray)";
  const typoLightGray = "light-gray";
  const typoDarkBlue = "dark-blue";

  const colorSVG = (uri) => {
    return location.pathname === uri ? darkblue : lightgray;
  };

  const colorTypo = (uri) => {
    return location.pathname === uri ? typoDarkBlue : typoLightGray;
  };

  const sm = useMediaQuery("(min-width: 360px) and (max-width:576px)");

  return (
    <>
      {sm && (
        <div className={styles.wrapper} {...props}>
          <nav>
            <ul className={styles.nav}>
              <li>
                <Link to="/">
                  <HomeSVG stroke={colorSVG("/")} width={26} height={23} />
                  <Typography variant="body-3-medium" color={colorTypo("/")}>
                    Home
                  </Typography>
                </Link>
              </li>
              <li>
                {user ? (
                  <Link to="transaction">
                    <OrderSVG stroke={colorSVG("/transaction")} />
                    <Typography
                      variant="body-3-medium"
                      color={colorTypo("/transaction")}
                    >
                      Orders
                    </Typography>
                  </Link>
                ) : (
                  <a
                    href="#"
                    onClick={() => {
                      toast.warning("Log in to view post orders");
                    }}
                  >
                    <OrderSVG stroke={colorSVG("/transaction")} />
                    <Typography
                      variant="body-3-medium"
                      color={colorTypo("/transaction")}
                    >
                      Orders
                    </Typography>
                  </a>
                )}
              </li>
              <li>
                {user ? (
                  <Link to="listing/add">
                    <PlusSVG height={30} width={30} fill="var(--dark-blue)" />
                    <Typography
                      variant="body-3-medium"
                      color={colorTypo("/listing/add")}
                    >
                      Post
                    </Typography>
                  </Link>
                ) : (
                  <a
                    href="#"
                    onClick={() => {
                      toast.warning("Log in to view post listing");
                    }}
                  >
                    <PlusSVG height={30} width={30} fill="var(--dark-blue)" />
                    <Typography variant="body-3-medium" color="light-gray">
                      Post
                    </Typography>
                  </a>
                )}
              </li>
              <li>
                {user ? (
                  <Link to="settings">
                    <SettingsSVG stroke={colorSVG("/settings")} />
                    <Typography
                      variant="body-3-medium"
                      color={colorTypo("/settings")}
                    >
                      Settings
                    </Typography>
                  </Link>
                ) : (
                  <a
                    href="#"
                    onClick={() => {
                      toast.warning("Log in to view settings");
                    }}
                  >
                    <SettingsSVG stroke={colorSVG("/settings")} />
                    <Typography
                      variant="body-3-medium"
                      color={colorTypo("/settings")}
                    >
                      Settings
                    </Typography>
                  </a>
                )}
              </li>
              <li>
                {user ? (
                  <Link to="user">
                    <ProfileSVG fill={colorSVG("/user")} />
                    <Typography
                      variant="body-3-medium"
                      color={colorTypo("/user")}
                    >
                      Profile
                    </Typography>
                  </Link>
                ) : (
                  <a
                    href="#"
                    onClick={() => {
                      toast.warning("Log in to view profile");
                    }}
                  >
                    <ProfileSVG fill={colorSVG("/user")} />
                    <Typography
                      variant="body-3-medium"
                      color={colorTypo("/user")}
                    >
                      Profile
                    </Typography>
                  </a>
                )}
              </li>
            </ul>
          </nav>
          <div>
            <ToastContainer position="top-center" />
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNav;
