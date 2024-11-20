import React from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import ActiveListingCard from "../../base/ActiveListingCard/ActiveListingCard";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Custom icon
const customIcon = L.icon({
  iconUrl: require("./Marker.png"),
  iconSize: [20, 32],
});

const MapLeaflet = ({
  center = [49.225693, -123.107326], //default position is Langara College if the user does not allow to track it's current position
  zoom,
  position,
  markerData,
  permanent,
  direction,
  component,
  width,
  height,
  borderRadius,
  zIndex,
  bounds,
  showActiveListing,
  currentAddress,
  meetup,
  meetupLocation,
  ...props
}) => {
  return (
    <>
      <MapContainer
        {...props}
        style={{ width, height, borderRadius, zIndex }}
        bounds={bounds}
        scrollWheelZoom
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading>
          {markerData &&
            markerData.map((el) => {
              return el.id ? (
                <Marker
                  key={el.id}
                  position={[el.location.latitude, el.location.longitude]}
                  onMouseOver={(e) => {
                    e.target.openPopup();
                  }}
                  onMouseOut={(e) => {
                    e.target.closePopup();
                  }}
                  icon={customIcon}
                  eventHandlers={{
                    click: (e) => {
                      if (!meetup) {
                        currentAddress
                          ? window.open(
                              `https://www.google.com/maps/dir/${currentAddress}/${el.meetUpAddress}/`,
                              "_blank"
                            )
                          : window.open(
                              `http://maps.google.com/?q=${el.meetUpAddress}`,
                              "_blank"
                            );
                      } else {
                        window.open(
                          `http://maps.google.com/?q=${meetupLocation}`,
                          "_blank"
                        );
                      }
                    },
                  }}
                >
                  {showActiveListing && (
                    <>
                      <Tooltip permanent={permanent} direction={direction}>
                        <ActiveListingCard
                          key={el.id}
                          distance={0}
                          // days={2}
                          source={
                            el.images.length > 0
                              ? el.images[0]
                              : "../../../assets/images/NoImages.png"
                          }
                          itemname={el.name}
                          price={el.price}
                          stock={el.qty}
                          alt={el.name}
                          onClick={() => console.log(el.id)}
                          maxwidth={"150px"}
                          width={"150px"}
                        />
                      </Tooltip>
                      {/* <Popup
                        interactive
                        eventHandlers={{
                          click: (e) => {
                            currentAddress
                              ? window.open(
                                  `https://www.google.com/maps/dir/${currentAddress}/${el.meetUpAddress}/`,
                                  "_blank"
                                )
                              : window.open(
                                  `http://maps.google.com/?q=${el.meetUpAddress}`,
                                  "_blank"
                                );
                          },
                        }}
                      >
                        <ActiveListingCard
                          key={el.id}
                          distance={2}
                          days={2}
                          source={
                            el.images.length > 0
                              ? el.images[0]
                              : "../../../assets/images/NoImages.png"
                          }
                          itemname={el.name}
                          price={el.price}
                          stock={el.qyty}
                          alt={el.name}
                          onClick={() => console.log(el.id)}
                          maxwidth={"150px"}
                          width={"150px"}
                        />
                      </Popup> */}
                    </>
                  )}
                </Marker>
              ) : (
                <Marker
                  position={[el.location.latitude, el.location.longitude]}
                  onMouseOver={(e) => {
                    e.target.openPopup();
                  }}
                  onMouseOut={(e) => {
                    e.target.closePopup();
                  }}
                  icon={customIcon}
                ></Marker>
              );
            })}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
};

export default MapLeaflet;
