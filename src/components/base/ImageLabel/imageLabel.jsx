import React from "react";
import style from "./imageLabel.module.css";
import Typography from "../Typography/Typography";

export const imageLabel = (props) => {
  const { distance, days, className } = props;
  // console.log(typeof days)
  return (
    <div className={`${style.wrapper} ${className}`} {...props}>
      <div className={style.imageLabel}>
        {distance !== 0 && (
          <>
            <Typography variant="body-4-regular" color="dark-blue">
              {distance === 1 ? distance + " km" : distance + " kms"}
            </Typography>

            <Typography variant="body-4-regular" color="dark-blue">
              {days && (
                <>
                  &nbsp;|&nbsp;
                  {days === 0
                    ? "today"
                    : 1 < days
                    ? `${days} days`
                    : `${days} day`}{" "}
                </>
              )}
            </Typography>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(imageLabel);
