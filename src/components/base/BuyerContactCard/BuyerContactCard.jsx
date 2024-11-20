import React from "react";
import Typography from "../Typography/Typography";
import PhoneSVG from "../SVG/PhoneSVG";
import EnvelopeSVG from "../SVG/EnvelopeSVG";
import UserSVG from "../SVG/UserSVG";
import styles from "./buyerContactCard.module.css";

const BuyerContactCard = ({
  source,
  alt,
  nameOfBuyer,
  contactTel,
  email,
  label,
  ...props
}) => {
  return (
    <div className={`${styles["buyer-contact-card-wrapper"]}`}>
      <div className={`${styles["buyer-contact-card"]}`}>
        <Typography
          variant="h3-graphik-bold"
          color="black"
          style={{ marginBottom: "12px" }}
        >
          {label}
        </Typography>
        <div className={`${styles["buyer-contact-details"]}`}>
          <div className={`${styles["image-container"]}`}>
            <img src={source} alt={alt} />
          </div>
          <div className={`${styles["buyer-contact-description"]}`}>
            <UserSVG height={21} width={21} fill={"black"} />
            <Typography variant="body-1-regular" color="gray">
              {nameOfBuyer}
            </Typography>

            <PhoneSVG height={22} width={21} fill={"none"} />
            <Typography variant="body-1-regular" color="gray">
              {contactTel}
            </Typography>

            <EnvelopeSVG height={14} width={21} fill={"none"} />
            <Typography
              variant="body-1-regular"
              color="gray"
              style={{ wordBreak: "break-all" }}
            >
              {email}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(BuyerContactCard);
