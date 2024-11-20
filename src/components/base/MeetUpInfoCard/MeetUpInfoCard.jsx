import React from "react";
import Typography from "../Typography/Typography";
import styles from "./meetUpInfoCard.module.css";
import CalendarSVG from "../SVG/CalendarSVG";
import ClockSVG from "../SVG/ClockSVG";
import LocationBoldSVG from "../SVG/LocationBoldSVG";
import MapLeaflet from "../../module/MapLeaflet/MapLeaflet";

const MeetUpInfoCard = ({
  date,
  time,
  location,
  latitude,
  longitude,
  showActiveListing,
  ...prop
}) => {
  const coordinates =
    latitude && longitude
      ? [
          {
            id: location.replace(/\s/g, ""),
            location: { latitude: latitude, longitude: longitude },
          },
        ]
      : [];
  const bounds = latitude && longitude ? [[latitude, longitude]] : [];

  return (
    <div className={`${styles["meet-up-info-card"]}`}>
      <div className={`${styles["title-container"]}`}>
        <Typography variant="h3-graphik-bold">Meet-up Info</Typography>
      </div>

      <CalendarSVG
        height={23}
        width={20}
        fill={"black"}
        style={{ marginRight: "1rem" }}
      />
      <Typography variant="body-1-medium" color="gray">
        {date}
      </Typography>

      <ClockSVG
        height={23}
        width={20}
        fill={"black"}
        style={{ marginRight: "1rem" }}
      />
      <Typography variant="body-1-medium" color="gray">
        {time}
      </Typography>

      <LocationBoldSVG
        style={{ gridColumn: "0", marginRight: "1rem" }}
        height={23}
        width={20}
      />
      <Typography variant="body-1-medium" color="gray">
        {location}
      </Typography>

      <div className={`${styles["map-container"]}`}>
        <MapLeaflet
          markerData={coordinates}
          direction="top"
          permanent
          width="100%"
          height="100%"
          borderRadius="20px"
          zIndex={2}
          bounds={bounds}
          meetup
          meetupLocation={location}
          showActiveListing={false}
        />
      </div>
    </div>
  );
};

export default React.memo(MeetUpInfoCard);
