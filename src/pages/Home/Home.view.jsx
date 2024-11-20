import React from "react";
import MapLeaflet from "../../components/module/MapLeaflet/MapLeaflet";
import style from "./Home.module.css";
import Typography from "../../components/base/Typography/Typography";
import { MapMarkerSVG } from "../../components/base/SVG";
import ActiveListingCard from "../../components/base/ActiveListingCard/ActiveListingCard";
import getPreciseDistance from "geolib/es/getDistance";
import Button from "../../components/base/Button/Button";
import Grid from "../../components/layout/Grid/Grid";
import { Link } from "react-router-dom";

const Home = (props) => {
  const {
    lg,
    xl,
    columns,
    zoom,
    desktopProducts,
    latitude,
    longitude,
    error,
    desktopBounds,
    currentAddress,
    toggleDisplayHandler,
    toggleDisplay,
    debouncedValue,
    categoryValue,
    locationFilter,
  } = props;
  if (
    desktopProducts.length === 0 &&
    (debouncedValue || categoryValue.length > 0)
  ) {
    return (
      <div style={{ textAlign: "center", marginTop: "15%" }}>
        <Typography color="error" variant="h4-graphik-bold">
          Oh snap! That product is not yet available.
        </Typography>
      </div>
    );
  }

  return (
    <>
      {xl || lg ? (
        <div className={style.desktopWrapper}>
          <div
            className={style.desktopListing}
            style={{
              padding: toggleDisplay ? "28px 36px 0 36px" : "28px 36px",
              boxSizing: "border-box",
            }}
          >
            <div>
              <div className={style.title}>
                <Typography variant="h2-graphik-bold" color="black">
                  {currentAddress ? "Picks Near You" : "Products"}
                </Typography>
                <Button
                  variant="black"
                  type="submit"
                  size="sm"
                  label={`${toggleDisplay ? "Map" : "Listings"}`}
                  hoverable
                  onClickHandler={toggleDisplayHandler}
                />
              </div>
              {currentAddress && (
                <div className={style.location}>
                  <MapMarkerSVG width={16} height={24} />
                  <Typography variant="body-4-regular" color="dark-blue">
                    {currentAddress}
                  </Typography>
                </div>
              )}
            </div>
            {toggleDisplay ? (
              <Grid
                columns={columns}
                gap="16px"
                style={{
                  overflow: "auto",
                }}
              >
                {desktopProducts &&
                  desktopProducts.map((product, index) => {
                    let tmp = {
                      latitude: product.location._lat,
                      longitude: product.location._long,
                    };

                    let locFilter = {
                      latitude: locationFilter.latitude,
                      longitude: locationFilter.longitude,
                    };

                    let distance = 0;
                    if (
                      latitude &&
                      longitude &&
                      locationFilter.latitude === "" &&
                      locationFilter.longitude === ""
                    ) {
                      distance = getPreciseDistance(tmp, {
                        latitude,
                        longitude,
                      });
                      distance = Math.ceil(Number(distance) / 1000);
                    } else if (
                      locationFilter.latitude &&
                      locationFilter.longitude
                    ) {
                      distance = getPreciseDistance(tmp, locFilter);
                      distance = Math.ceil(Number(distance) / 1000);
                    }
                    return (
                      <Link
                        key={product.id}
                        to={`/listing/${product.id}`}
                        state={{
                          id: product.id,
                          createdAt: product.createdAt,
                          createdByDisplayName: product.createdByNickName,
                          createdByIdent: product.createdByIdent,
                          description: product.description,
                          images: product.images,
                          latitude: product.lat,
                          longitude: product.long,
                          meetUpAddress: product.meetUpAddress,
                          meetUpInfo: product.meetUpInfo,
                          name: product.name,
                          price: product.price,
                          qty: product.qty,
                        }}
                      >
                        <ActiveListingCard
                          distance={!!error ? 0 : distance}
                          source={
                            product.images
                              ? product.images[0]
                              : "src/assets/images/NoImage.jpg"
                          }
                          itemname={product.name}
                          price={product.price}
                          stock={product.qty}
                          alt={product.name}
                          maxwidth={xl || lg ? "185px" : "150px"}
                          width={"100%"}
                          height={"auto"}
                          ratio={1}
                        />
                      </Link>
                    );
                  })}
              </Grid>
            ) : (
              <MapLeaflet
                zoom={zoom}
                markerData={desktopProducts}
                direction="top"
                // width="100%"
                height="100%"
                borderRadius="20px"
                zIndex={2}
                bounds={desktopBounds}
                showActiveListing={true}
                currentAddress={currentAddress}
              />
            )}
          </div>
        </div>
      ) : (
        <>
          <div className={style.mobileWrapper}>
            <div className={style.mobileListing}>
              <div>
                <div className={style.title}>
                  <Typography variant="h2-graphik-bold" color="black">
                    {currentAddress ? "Picks Near You" : "Products"}
                  </Typography>
                  <Button
                    variant="black"
                    type="submit"
                    size="sm"
                    label={`${toggleDisplay ? "Map" : "Listings"}`}
                    hoverable
                    onClickHandler={toggleDisplayHandler}
                  />
                </div>
                {currentAddress && (
                  <div className={style.location}>
                    <MapMarkerSVG width={16} height={24} />
                    <Typography variant="body-4-regular" color="dark-blue">
                      {currentAddress}
                    </Typography>
                  </div>
                )}
              </div>
              {toggleDisplay ? (
                <Grid columns={columns} gap="16px">
                  {desktopProducts &&
                    desktopProducts.map((product, index) => {
                      let tmp = {
                        latitude: product.location._lat,
                        longitude: product.location._long,
                      };
                      let locFilter = {
                        latitude: locationFilter.latitude,
                        longitude: locationFilter.longitude,
                      };

                      let distance = 0;
                      if (
                        latitude &&
                        longitude &&
                        locationFilter.latitude === "" &&
                        locationFilter.longitude === ""
                      ) {
                        distance = getPreciseDistance(tmp, {
                          latitude,
                          longitude,
                        });
                        distance = Math.ceil(Number(distance) / 1000);
                      } else if (
                        locationFilter.latitude &&
                        locationFilter.longitude
                      ) {
                        distance = getPreciseDistance(tmp, locFilter);
                        distance = Math.ceil(Number(distance) / 1000);
                      }

                      return (
                        <Link
                          key={product.id}
                          to={`/listing/${product.id}`}
                          state={{
                            id: product.id,
                            createdAt: product.createdAt,
                            createdByDisplayName: product.createdByNickName,
                            createdByIdent: product.createdByIdent,
                            description: product.description,
                            images: product.images,
                            latitude: product.lat,
                            longitude: product.long,
                            meetUpAddress: product.meetUpAddress,
                            meetUpInfo: product.meetUpInfo,
                            name: product.name,
                            price: product.price,
                            qty: product.qty,
                          }}
                        >
                          <ActiveListingCard
                            distance={!!error ? 0 : distance}
                            source={
                              product.images
                                ? product.images[0]
                                : "src/assets/images/NoImage.jpg"
                            }
                            itemname={product.name}
                            price={product.price}
                            stock={product.qty}
                            alt={product.name}
                            maxwidth={xl || lg ? "185px" : "150px"}
                            width={"100%"}
                            height={"auto"}
                            ratio={1}
                          />
                        </Link>
                      );
                    })}
                </Grid>
              ) : (
                <div
                  style={{
                    height: "100vh",
                  }}
                >
                  <MapLeaflet
                    zoom={zoom}
                    markerData={desktopProducts}
                    direction="top"
                    height="100%"
                    borderRadius="20px"
                    zIndex={2}
                    bounds={desktopBounds}
                    showActiveListing={true}
                    currentAddress={currentAddress}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
