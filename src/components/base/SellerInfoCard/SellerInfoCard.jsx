import React from "react";
import styles from "./sellerInfoCard.module.css";
import Typography from "../Typography/Typography";
import LocationSVG from "../SVG/LocationSVG";
import UserSVG from "../SVG/UserSVG";

const SellerInfoCard = ({ source, username, location, items, ...props }) => {
  const inventory = () => {
    return items === "1" ? `1 item sold` : `${items} items sold`;
  };

  return (
    <div className={`${styles["seller-information-wrapper"]}`}>
      <Typography variant="h3-graphik-bold" style={{ marginBottom: "12px" }}>
        Seller Information
      </Typography>
      <div className={`${styles["seller-information"]}`}>
        <div className={`${styles["image-container"]}`}>
          <img src={source} alt="" />
        </div>
        <div className={`${styles["seller-details"]}`}>
          <div className={`${styles["seller-name-container"]}`}>
            <UserSVG height={21} width={19} fill={"black"} />
            <Typography variant="body-1-medium" style={{ marginLeft: ".5rem" }}>
              {username}
            </Typography>
          </div>
          <div className={`${styles["location-container"]}`}>
            <LocationSVG height={19} width={14} stroke="black" />
            <Typography
              variant="body-2-regular"
              style={{ marginLeft: ".5rem" }}
            >
              {location}
            </Typography>
          </div>
          <Typography variant="body-4-regular" style={{ marginLeft: ".4rem" }}>
            {inventory()}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SellerInfoCard);
