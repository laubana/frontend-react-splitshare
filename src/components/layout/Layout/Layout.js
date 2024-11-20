import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import BottomNav from "../BottomNav/BottomNav";
import { useEffect, useState } from "react";
import useMediaQuery from "../../../utils/useMediaQuery";
import Typography from "../../base/Typography/Typography";
const bottomNavStyle = {
  position: "absolute",
  left: 0,
  bottom: 0,
  right: 0,
};

const Layout = () => {
  const md = useMediaQuery("(min-width: 300px) and (max-width: 768px)");
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
    }

    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);
  useEffect(() => {
    const body = document.querySelector("body");
    if (location.pathname === "/login" || location.pathname === "/register") {
      body.style.backgroundColor = "var(--dark-blue)";
    } else if (location.pathname === "/") {
      body.style.backgroundColor = md ? "var(--white)" : "var(--bg-gray)";
    }
    // else if () {
    //   body.style.background =
    //     "linear-gradient(90deg,var(--dark-blue) 60% , var(--yellow) 60%)";
    // }
    else {
      body.style.backgroundColor = "var(--bg-gray)"; // Set the desired background color for other pages
    }

    // return () => {
    //   body.style.backgroundColor = ""; // Reset the background color when the component unmounts
    // };
  }, [location.pathname, md]);

  return (
    <div>
      <header style={{ position: "sticky", top: 0, zIndex: 5 }}>
        {location.pathname === "/login" || location.pathname === "/register" ? (
          <></>
        ) : (
          <Header />
        )}
      </header>
      <main className="App">
        {isOnline ? (
          <Outlet />
        ) : (
          <div style={{ textAlign: "center", marginTop: "15%" }}>
            <Typography color="error" variant="h4-graphik-bold">
              You are offline. Please check your internet connection.
            </Typography>
          </div>
        )}
      </main>
      <div
        style={{
          position: "fixed",
          bottom: 10,
          zIndex: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {location.pathname === "/login" || location.pathname === "/register" ? (
          <></>
        ) : (
          <BottomNav />
        )}
      </div>
    </div>
  );
};

export default Layout;
