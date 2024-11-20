import React from "react";
import style from "./ProfileDetails.module.css";
import { MarkerSmallSVG, OrderSmallSVG } from "../../../components/base/SVG";
import { ProfileBackgroundSVG } from "./../../../components/base/SVG";
import Avatar from "react-avatar";
import Typography from "../../../components/base/Typography/Typography";
import ActiveListingCard from "../../../components/base/ActiveListingCard/ActiveListingCard";
import Grid from "../../../components/layout/Grid/Grid";
import getDistance from "geolib/es/getDistance";
import { BeatLoader } from "react-spinners";

const ProfileDetail = ({
  data,
  product,
  sm,
  md,
  lg,
  xl,
  latitude,
  longitude,
  error,
  navigate,
}) => {
  return (
    <>
      <div
        style={{
          height: lg || xl ? "200px" : "125px",
          width: "100%",
          backgroundColor: "var(--light-blue)",
          backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/splitshare-67496.appspot.com/o/system-image%2FProfile-page-pattern-light.png?alt=media&token=65ee1c9f-f4cc-4564-9829-51203a2b4869")`,
          backgroundSize: "auto 250%",
          backgroundPosition: "left center",
          backgroundRepeat: "repeat",
          borderBottom: "2px solid black",
        }}
      ></div>
      <div className={lg || xl ? style.desktopWrapper : style.mobileWrapper}>
        <div
          className={
            lg || xl ? style.headerWrapperDesktop : style.headerWrapperMobile
          }
        >
          <Avatar
            className={style.avatar}
            email={data?.email}
            name={data?.displayName}
            size={sm || md ? "100" : lg || xl ? "150" : "150"}
            src={data?.imageUrl}
            round
            style={{
              border: "2px solid var(--black)",
              objectFit: "cover",
            }}
          />
          <div style={{ alignSelf: "flex-end" }}>
            <Typography variant="h2-graphik-bold" style={{ marginTop: "25px" }}>
              {data?.displayName}
            </Typography>
            {data?.address && (
              <div className={style.location}>
                <MarkerSmallSVG />
                <Typography variant="body-1-medium">{data?.address}</Typography>
              </div>
            )}
            <div className={style.sold}>
              <OrderSmallSVG />
              <Typography variant="body-1-medium">
                {data?.qty} items sold
              </Typography>
            </div>
          </div>
        </div>
        <Typography
          variant="h2-graphik-bold"
          style={{
            marginTop: "24px",
            marginBottom: "24px",
          }}
        >
          Active Listings
        </Typography>
        {product ? (
          0 < product.length ? (
            <Grid columns={sm ? 2 : md ? 3 : lg ? 4 : xl ? 5 : 2} gap="16px">
              {product.map((product) => {
                let tmp = {
                  latitude: product.lat,
                  longitude: product.long,
                };
                let distance = 0;
                if (latitude && longitude) {
                  distance = getDistance(tmp, {
                    latitude,
                    longitude,
                  });
                  distance = Math.ceil(Number(distance) / 1000);
                }

                const productCreatedDate = new Date(product.createdAt.toDate());
                productCreatedDate.setHours(0, 0, 0, 0);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const timeDiff = today.getTime() - productCreatedDate.getTime();
                const dateDiff = Math.abs(
                  Math.floor(timeDiff / (1000 * 60 * 60 * 24))
                );

                return (
                  <ActiveListingCard
                    key={product.id}
                    distance={!!error ? 0 : distance}
                    days={String(dateDiff)}
                    source={
                      product.images
                        ? product.images[0]
                        : "src/assets/images/NoImage.jpg"
                    }
                    itemname={product.name}
                    price={product.price}
                    stock={product.qty}
                    alt={product.name}
                    onClick={() => {
                      navigate(`/listing/${product.productId}`, {
                        state: {
                          id: product.productId,
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
                        },
                      });
                    }}
                    width={"100%"}
                    height={"100%"}
                    ratio={1}
                    style={{ marginBottom: "1rem" }}
                  />
                );
              })}
            </Grid>
          ) : (
            <div style={{ textAlign: "center" }}>
              <Typography variant="h4-graphik-bold" color="error">
                No listings available
              </Typography>
            </div>
          )
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <BeatLoader color="#1c2aae" />
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileDetail;
