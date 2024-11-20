/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useLocation } from "react-router-dom";
import styles from "./header.module.css";
import { UserAuth } from "../../../context/AuthContext";
import Button from "../../base/Button/Button";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchField from "../../base/SearchField/SearchField";
import { SearchContext } from "../../../context/SearchContext";
import { FilterSVG, LogoSVG } from "../../base/SVG";
import useMediaQuery from "../../../utils/useMediaQuery";
import Filter from "../../module/Filter/Filter";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../../../config/firebaseConfig";
import { Category } from "../../../context/CategoryContext";
import { Sort } from "../../../context/SortContext";

const Header = () => {
  const { user, logout } = UserAuth();
  const { searchValue, updateSearchValue, resetSearchValue } =
    useContext(SearchContext);

  const { updateCategoryValue } = Category();
  const { updateSortValue } = Sort();

  const [filterSelected, setFilterSelected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [options, setOptions] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "category"), (snapshot) => {
        return setOptions(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }),
    []
  );

  const handleLogOut = async () => {
    await logout();
  };

  const handleInputChange = (event) => {
    updateSearchValue(event.target.value);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const sm = useMediaQuery("(min-width: 360px) and (max-width:576px)");
  const md = useMediaQuery("(min-width: 577px) and (max-width:768px)");
  const lg = useMediaQuery("(min-width: 769px) and (max-width:1270px)");
  const xl = useMediaQuery("(min-width: 1271px)");
  const selectPosition = useMediaQuery("(max-width:768px)");
  console.log(selectPosition);
  useEffect(() => {
    if (location.pathname !== "/") {
      setFilterSelected(false);
    }
  }, [location.pathname]);

  const filterSize = useMediaQuery("(min-width: 990px");

  let headerSm = () => {
    return (
      <div className={styles.mobileWrapper}>
        <div className={styles.mobileTitle}>
          <LogoSVG width={150} height={31} />
          <Button
            variant="light-blue"
            size="sm"
            label={user ? "Logout" : "Login"}
            hoverable
            onClickHandler={user ? handleLogOut : handleLogin}
          />
        </div>
        {location.pathname === "/" && (
          <div className={styles.mobileFilter}>
            <SearchField
              value={searchValue}
              resetValue={resetSearchValue}
              onChange={handleInputChange}
              placeholder="What are you looking for?"
            />
            <FilterSVG
              height={22}
              width={25}
              fill={"var(--white)"}
              selected={filterSelected}
              onClick={() => setFilterSelected(!filterSelected)}
            />
          </div>
        )}
      </div>
    );
  };

  let headerMd = () => {
    return (
      <div className={styles.mdWrapper}>
        <div className={styles.mdTop}>
          <div className={styles.logo} style={{ marginRight: "41px" }}>
            <LogoSVG width={200} height={41} />
          </div>
          <div className={styles.mdRightButtons}>
            <Button
              variant="yellow"
              hoverable
              size="sm"
              onClickHandler={() =>
                user
                  ? navigate("listing/add")
                  : toast.warning("Log in to post listing")
              }
              label="Post Listing"
            />
            <Button
              variant="light-blue"
              size="sm"
              label={user ? "Logout" : "Login"}
              hoverable
              onClickHandler={user ? handleLogOut : handleLogin}
            />
          </div>
        </div>
        <div className={styles.mdMid}>
          <ul>
            {user != null && (
              <li>
                <Link
                  style={
                    location.pathname === "/"
                      ? {
                          color: "var(--yellow)",
                          fontWeight: "bold",
                          borderBottom: "2px solid var(--yellow)",
                          paddingBottom: "6px",
                        }
                      : { color: "var(--white)" }
                  }
                  to="/"
                >
                  Home
                </Link>
              </li>
            )}
            {user != null && (
              <li>
                <Link
                  style={
                    location.pathname === "/transaction"
                      ? {
                          color: "var(--yellow)",
                          fontWeight: "bold",
                          borderBottom: "2px solid var(--yellow)",
                          paddingBottom: "6px",
                        }
                      : { color: "var(--white)" }
                  }
                  to="transaction"
                >
                  Orders
                </Link>
              </li>
            )}
            {user != null && (
              <li>
                <Link
                  style={
                    location.pathname === "/settings"
                      ? {
                          color: "var(--yellow)",
                          fontWeight: "bold",
                          borderBottom: "2px solid var(--yellow)",
                          paddingBottom: "6px",
                        }
                      : { color: "var(--white)" }
                  }
                  to="settings"
                >
                  Settings
                </Link>
              </li>
            )}
            {user != null && (
              <li>
                <Link
                  style={
                    location.pathname === "/user"
                      ? {
                          color: "var(--yellow)",
                          fontWeight: "bold",
                          borderBottom: "2px solid var(--yellow)",
                          paddingBottom: "6px",
                        }
                      : { color: "var(--white)" }
                  }
                  to="user"
                >
                  Profile
                </Link>
              </li>
            )}
          </ul>
        </div>
        {location.pathname === "/" && (
          <div className={styles.mdBot}>
            <SearchField
              value={searchValue}
              resetValue={resetSearchValue}
              onChange={handleInputChange}
              placeholder="What are you looking for?"
            />
            <FilterSVG
              height={22}
              width={25}
              fill={"var(--white)"}
              selected={filterSelected}
              onClick={() => setFilterSelected(!filterSelected)}
            />
          </div>
        )}
      </div>
    );
  };

  let headerLg = () => {
    return (
      <div className={styles.lgWrapper}>
        <div className={styles.lgTop}>
          <div className={styles.logo} style={{ marginRight: "41px" }}>
            <LogoSVG width={200} height={41} />
          </div>
          <div className={styles.lgRightButtons}>
            <Button
              variant="yellow"
              hoverable
              size="sm"
              onClickHandler={() =>
                user
                  ? navigate("listing/add")
                  : toast.warning("Log in to post listing")
              }
              label="Post Listing"
            />
            <Button
              variant="light-blue"
              size="sm"
              label={user ? "Logout" : "Login"}
              hoverable
              onClickHandler={user ? handleLogOut : handleLogin}
            />
          </div>
        </div>
        <div className={styles.lgBot}>
          <div className={styles.lgNavLeft}>
            <ul>
              {user != null && (
                <li>
                  <Link
                    style={
                      location.pathname === "/"
                        ? {
                            color: "var(--yellow)",
                            fontWeight: "bold",
                            borderBottom: "2px solid var(--yellow)",
                            paddingBottom: "6px",
                          }
                        : { color: "var(--white)" }
                    }
                    to="/"
                  >
                    Home
                  </Link>
                </li>
              )}
              {user != null && (
                <li>
                  <Link
                    style={
                      location.pathname === "/transaction"
                        ? {
                            color: "var(--yellow)",
                            fontWeight: "bold",
                            borderBottom: "2px solid var(--yellow)",
                            paddingBottom: "6px",
                          }
                        : { color: "var(--white)" }
                    }
                    to="transaction"
                  >
                    Orders
                  </Link>
                </li>
              )}
              {user != null && (
                <li>
                  <Link
                    style={
                      location.pathname === "/settings"
                        ? {
                            color: "var(--yellow)",
                            fontWeight: "bold",
                            borderBottom: "2px solid var(--yellow)",
                            paddingBottom: "6px",
                          }
                        : { color: "var(--white)" }
                    }
                    to="settings"
                  >
                    Settings
                  </Link>
                </li>
              )}
              {user != null && (
                <li>
                  <Link
                    style={
                      location.pathname === "/user"
                        ? {
                            color: "var(--yellow)",
                            fontWeight: "bold",
                            borderBottom: "2px solid var(--yellow)",
                            paddingBottom: "6px",
                          }
                        : { color: "var(--white)" }
                    }
                    to="user"
                  >
                    Profile
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {location.pathname === "/" && (
            <div className={styles.lgFilterRight}>
              <SearchField
                value={searchValue}
                resetValue={resetSearchValue}
                onChange={handleInputChange}
                placeholder="What are you looking for?"
              />
              <FilterSVG
                height={22}
                width={25}
                fill={"var(--white)"}
                selected={filterSelected}
                onClick={() => setFilterSelected(!filterSelected)}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  let headerXl = () => {
    return (
      <div className={styles.xlWrapper}>
        <div className={styles.xlLeft}>
          <div style={{ marginRight: "41px" }}>
            <LogoSVG width={200} height={41} />
          </div>

          {location.pathname === "/" && (
            <>
              <SearchField
                value={searchValue}
                resetValue={resetSearchValue}
                onChange={handleInputChange}
                placeholder="What are you looking for?"
              />
              <FilterSVG
                height={22}
                width={25}
                fill={"var(--white)"}
                selected={filterSelected}
                onClick={() => setFilterSelected(!filterSelected)}
              />
            </>
          )}
        </div>
        <div className={styles.xlRight}>
          <ul>
            {user != null && (
              <li>
                <Link
                  style={
                    location.pathname === "/"
                      ? {
                          color: "var(--yellow)",
                          fontWeight: "bold",
                          borderBottom: "2px solid var(--yellow)",
                          paddingBottom: "6px",
                        }
                      : { color: "var(--white)" }
                  }
                  to="/"
                >
                  Home
                </Link>
              </li>
            )}
            {user != null && (
              <li>
                <Link
                  style={
                    location.pathname === "/transaction"
                      ? {
                          color: "var(--yellow)",
                          fontWeight: "bold",
                          borderBottom: "2px solid var(--yellow)",
                          paddingBottom: "6px",
                        }
                      : { color: "var(--white)" }
                  }
                  to="transaction"
                >
                  Orders
                </Link>
              </li>
            )}

            {user != null && (
              <li>
                <Link
                  style={
                    location.pathname === "/settings"
                      ? {
                          color: "var(--yellow)",
                          fontWeight: "bold",
                          borderBottom: "2px solid var(--yellow)",
                          paddingBottom: "6px",
                        }
                      : { color: "var(--white)" }
                  }
                  to="settings"
                >
                  Settings
                </Link>
              </li>
            )}
            {user != null && (
              <li>
                <Link
                  style={
                    location.pathname === "/user"
                      ? {
                          color: "var(--yellow)",
                          fontWeight: "bold",
                          borderBottom: "2px solid var(--yellow)",
                          paddingBottom: "6px",
                        }
                      : { color: "var(--white)" }
                  }
                  to="user"
                >
                  Profile
                </Link>
              </li>
            )}
            <li>
              <Button
                variant="yellow"
                hoverable
                size="sm"
                onClickHandler={() =>
                  user
                    ? navigate("listing/add")
                    : toast.warning("Log in to post listing")
                }
                label="Post Listing"
              />
            </li>
            <li>
              <Button
                variant="light-blue"
                size="sm"
                label={user ? "Logout" : "Login"}
                hoverable
                onClickHandler={user ? handleLogOut : handleLogin}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  };
  let content = sm
    ? headerSm()
    : md
    ? headerMd()
    : lg
    ? headerLg()
    : xl
    ? headerXl()
    : headerXl();

  return (
    <>
      {content}
      <div
        style={{
          maxHeight: filterSelected ? "1000px" : "0",
          transition: "max-height 0.3s ease-in-out",
        }}
      >
        {filterSelected && (
          <Filter
            onChange={(v) => updateCategoryValue(v)}
            options={options}
            placeholder="All Categories"
            screenSize={filterSize}
            dropdownPosition={selectPosition ? "top" : undefined}
          />
        )}
      </div>
      <div>
        <ToastContainer position="top-center" />
      </div>
    </>
  );
};

export default Header;
