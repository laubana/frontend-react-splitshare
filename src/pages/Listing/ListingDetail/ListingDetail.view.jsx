import React from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../../../utils/useMediaQuery";
import ImageList from "../../../components/base/ImageList/ImageList";
import Card from "../../../components/base/Card/Card";
import DescriptionCard from "../../../components/base/DescriptionCard/DescriptionCard";
import ProductInfoCard from "../../../components/base/ProductInfoCard/ProductInfoCard";
import MeetUpInfoCard from "../../../components/base/MeetUpInfoCard/MeetUpInfoCard";
import BackButton from "../../../components/base/BackButton/BackButton";
import BeatLoader from "react-spinners/BeatLoader";
import Typography from "../../../components/base/Typography/Typography";
import SellerInfoCard from "../../../components/base/SellerInfoCard/SellerInfoCard";
import Button from "../../../components/base/Button/Button";
import NumberInput from "../../../components/base/NumberInput/NumberInput";
import Modal from "../../../components/base/Modal/Modal";
import CarouselSwiper from "../../../components/module/CarouselSwiper/CarouselSwiper";
import styles from "./ListingDetail.module.css";

const ListingDetail = (props) => {
  const {
    user,
    product,
    seller,
    quantity,
    setQuantity,
    isRequested,
    orderStatus,
    carouselVisibility,
    requestVisibility,
    cancelRequestVisibility,
    cancelTransactionVisibility,
    handleOnOpen,
    handleOnClose,
    handleOnOpenRequest,
    handleOnConfirmRequest,
    handleOnCloseRequest,
    handleOnOpenCancelRequest,
    handleOnOpenCancelTransaction,
    handleOnConfirmCancelRequest,
    handleOnConfirmCancelTransaction,
    handleOnCloseCancelRequest,
    handleOnCloseCancelTransaction,
  } = props;

  const navigate = useNavigate();

  const lg = useMediaQuery("(min-width: 769px)");

  const getDate = (seconds) => {
    const _createdAt = new Date(seconds * 1000);
    _createdAt.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const timeDiff = today.getTime() - _createdAt.getTime();
    return Math.abs(Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
  };

  return (
    <>
      {lg ? (
        <>
          <div className={`${styles.wrapper}`}>
            <div className={styles.btn}>
              <BackButton onClickHandler={() => navigate(-1)} />
            </div>
            {user && product && seller && isRequested != undefined ? (
              <Card>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gap: "20px",
                  }}
                >
                  <div style={{ gridColumn: "1 / -1" }}>
                    <ProductInfoCard
                      title={product.name}
                      price={product.price}
                      quantity={product.qty}
                      date={getDate(product.createdAt.seconds)}
                      name={product.createdByDisplayName}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <ImageList
                      images={product.images}
                      onClick={handleOnOpen}
                      mode="vertical"
                    />
                    <Card nopadding noborder noshadow>
                      <SellerInfoCard
                        source={seller.imageUrl}
                        username={`${seller.displayName}`}
                        location={seller.address}
                        items={seller.qty}
                      />
                    </Card>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <Card nopadding noborder noshadow>
                      {user.uid === seller.id ? (
                        <DescriptionCard
                          description={product.description}
                          nobutton
                        />
                      ) : isRequested ? (
                        orderStatus === "pending" ? (
                          <DescriptionCard
                            description={product.description}
                            handleOnClick={handleOnOpenCancelRequest}
                            color="white"
                            label="Cancel Request"
                          />
                        ) : (
                          <DescriptionCard
                            description={product.description}
                            handleOnClick={handleOnOpenCancelTransaction}
                            color="white"
                            label="Cancel Transaction"
                          />
                        )
                      ) : (
                        <DescriptionCard
                          description={product.description}
                          handleOnClick={handleOnOpenRequest}
                          color="yellow"
                          label="Request Purchase"
                        />
                      )}
                    </Card>
                    <MeetUpInfoCard
                      date={new Date(
                        product.meetUpInfo.seconds * 1000
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      time={new Date(
                        product.meetUpInfo.seconds * 1000
                      ).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                      latitude={product.latitude}
                      longitude={product.longitude}
                      location={product.meetUpAddress}
                    />
                  </div>
                </div>
              </Card>
            ) : (
              <Card>
                <div style={{ textAlign: "center" }}>
                  <BeatLoader color="#1c2aae" />
                </div>
              </Card>
            )}
          </div>
          {product && (
            <Modal visibility={carouselVisibility} onClose={handleOnClose}>
              <CarouselSwiper images={product.images} />
            </Modal>
          )}
          {product && (
            <Modal
              visibility={requestVisibility}
              onClose={handleOnCloseRequest}
            >
              <div style={{ display: "grid", gap: "20px" }}>
                <div
                  style={{
                    display: "grid",
                    gap: "20px",
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4-graphik-bold">
                    How many do you want to buy?
                  </Typography>
                  <NumberInput
                    inputNumber={quantity}
                    setInputNumber={setQuantity}
                    justify="center"
                    minValue={1}
                    maxValue={product.qty}
                    nanErrMsg={"Please enter a number."}
                    minErrMsg={"Number must be at least 1."}
                    maxErrMsg={
                      "Number cannot be larger than available portions."
                    }
                  />
                  <Typography variant="h4-graphik-bold">
                    Total Price : $
                    {isNaN(quantity) ||
                    !isFinite(quantity) ||
                    quantity < 0 ||
                    product.qty < quantity
                      ? Number(0).toFixed(2)
                      : (Number(quantity) * Number(product.price)).toFixed(2)}
                  </Typography>
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                  <Button
                    onClickHandler={handleOnCloseRequest}
                    size="lg"
                    variant="white"
                    label="Cancel"
                  />
                  <Button
                    onClickHandler={handleOnConfirmRequest}
                    size="lg"
                    variant="yellow"
                    label="Confirm"
                  />
                </div>
              </div>
            </Modal>
          )}
          <Modal
            visibility={cancelRequestVisibility}
            onClose={handleOnCloseCancelRequest}
          >
            <div style={{ display: "grid", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gap: "20px",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4-graphik-bold">
                  Do you really want to cancel the request?
                </Typography>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <Button
                  onClickHandler={handleOnCloseCancelRequest}
                  size="lg"
                  variant="white"
                  label="Cancel"
                />
                <Button
                  onClickHandler={handleOnConfirmCancelRequest}
                  size="lg"
                  variant="yellow"
                  label="Confirm"
                />
              </div>
            </div>
          </Modal>
          <Modal
            visibility={cancelTransactionVisibility}
            onClose={handleOnCloseCancelTransaction}
          >
            <div style={{ display: "grid", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gap: "20px",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4-graphik-bold">
                  Do you really want to cancel the transaction?
                </Typography>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <Button
                  onClickHandler={handleOnCloseCancelTransaction}
                  size="lg"
                  variant="white"
                  label="Cancel"
                />
                <Button
                  onClickHandler={handleOnConfirmCancelTransaction}
                  size="lg"
                  variant="yellow"
                  label="Confirm"
                />
              </div>
            </div>
          </Modal>
        </>
      ) : (
        <>
          <div className={`${styles.wrapper}`}>
            <div className={styles.btn}>
              <BackButton onClickHandler={() => navigate(-1)} />
            </div>
            {user && product && seller && isRequested !== undefined ? (
              <>
                <Card>
                  <div
                    style={{
                      display: "grid",
                      gap: "20px",
                    }}
                  >
                    <ProductInfoCard
                      title={product.name}
                      price={product.price}
                      quantity={product.qty}
                      date={getDate(product.createdAt.seconds)}
                      name={product.createdByDisplayName}
                    />
                    <ImageList images={product.images} onClick={handleOnOpen} />
                  </div>
                </Card>
                <Card nopadding noborder>
                  {user.uid === seller.id ? (
                    <DescriptionCard
                      description={product.description}
                      nobutton
                    />
                  ) : isRequested ? (
                    orderStatus === "pending" ? (
                      <DescriptionCard
                        description={product.description}
                        handleOnClick={handleOnOpenCancelRequest}
                        color="white"
                        label="Cancel Request"
                      />
                    ) : (
                      <DescriptionCard
                        description={product.description}
                        handleOnClick={handleOnOpenCancelTransaction}
                        color="white"
                        label="Cancel Transaction"
                      />
                    )
                  ) : (
                    <DescriptionCard
                      description={product.description}
                      handleOnClick={handleOnOpenRequest}
                      color="yellow"
                      label="Request Purchase"
                    />
                  )}
                </Card>
                <Card nopadding noborder>
                  <MeetUpInfoCard
                    date={new Date(
                      product.meetUpInfo.seconds * 1000
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    time={new Date(
                      product.meetUpInfo.seconds * 1000
                    ).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                    latitude={product.latitude}
                    longitude={product.longitude}
                    location={product.meetUpAddress}
                  />
                </Card>
                <Card nopadding noborder>
                  <SellerInfoCard
                    source={seller.imageUrl}
                    username={`${seller.displayName}`}
                    location={seller.address}
                    items={seller.qty}
                  />
                </Card>
              </>
            ) : (
              <Card>
                <div style={{ textAlign: "center" }}>
                  <BeatLoader color="#1c2aae" />
                </div>
              </Card>
            )}
          </div>
          {product && (
            <Modal visibility={carouselVisibility} onClose={handleOnClose}>
              <CarouselSwiper images={product.images} />
            </Modal>
          )}
          {product && (
            <Modal
              visibility={requestVisibility}
              onClose={handleOnCloseRequest}
            >
              <div style={{ display: "grid", gap: "20px" }}>
                <div
                  style={{
                    display: "grid",
                    gap: "20px",
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4-graphik-bold">
                    How many do you want to buy?
                  </Typography>
                  <NumberInput
                    inputNumber={quantity}
                    setInputNumber={setQuantity}
                    justify="center"
                    minValue={1}
                    maxValue={product.qty}
                    nanErrMsg={"Please enter a number."}
                    minErrMsg={"Number must be at least 1."}
                    maxErrMsg={
                      "Number cannot be larger than available portions."
                    }
                  />
                  <Typography variant="h4-graphik-bold">
                    Total Price : $
                    {isNaN(quantity) ||
                    !isFinite(quantity) ||
                    quantity < 0 ||
                    product.qty < quantity
                      ? Number(0).toFixed(2)
                      : (Number(quantity) * Number(product.price)).toFixed(2)}
                  </Typography>
                </div>
                <div style={{ display: "flex", gap: "20px" }}>
                  <Button
                    onClickHandler={handleOnCloseRequest}
                    size="lg"
                    variant="white"
                    label="Cancel"
                  />
                  <Button
                    onClickHandler={handleOnConfirmRequest}
                    size="lg"
                    variant="yellow"
                    label="Confirm"
                  />
                </div>
              </div>
            </Modal>
          )}
          <Modal
            visibility={cancelRequestVisibility}
            onClose={handleOnCloseCancelRequest}
          >
            <div style={{ display: "grid", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gap: "20px",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4-graphik-bold">
                  Do you really want to cancel the request?
                </Typography>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <Button
                  onClickHandler={handleOnCloseCancelRequest}
                  size="lg"
                  variant="white"
                  label="Cancel"
                />
                <Button
                  onClickHandler={handleOnConfirmCancelRequest}
                  size="lg"
                  variant="yellow"
                  label="Confirm"
                />
              </div>
            </div>
          </Modal>
          <Modal
            visibility={cancelTransactionVisibility}
            onClose={handleOnCloseCancelTransaction}
          >
            <div style={{ display: "grid", gap: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gap: "20px",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4-graphik-bold">
                  Do you really want to cancel the transaction?
                </Typography>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <Button
                  onClickHandler={handleOnCloseCancelTransaction}
                  size="lg"
                  variant="white"
                  label="Cancel"
                />
                <Button
                  onClickHandler={handleOnConfirmCancelTransaction}
                  size="lg"
                  variant="yellow"
                  label="Confirm"
                />
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default ListingDetail;
