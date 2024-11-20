import React from "react";
import Grid from "../../../components/layout/Grid/Grid";
import SellingItemCard from "../../../components/base/SellingItemCard/SellingItemCard";
import BuyerContactCard from "../../../components/base/BuyerContactCard/BuyerContactCard";
import MeetUpInfoCard from "../../../components/base/MeetUpInfoCard/MeetUpInfoCard";
import Button from "../../../components/base/Button/Button";
import Card from "../../../components/base/Card/Card";
import useMediaQuery from "../../../utils/useMediaQuery";
import BackButton from "../../../components/base/BackButton/BackButton";
import styles from "./transactionDetail.module.css";
import Typography from "../../../components/base/Typography/Typography";

const TransactionDetail = (props) => {
  const {
    user,
    order,
    navigate,
    handleOnDecline,
    handleOnAccept,
    handleOnComplete,
    handleOnCancel,
    meetUpDate,
    meetUpTime,
    dateApproved,
  } = props;

  const isDesktop = useMediaQuery("(min-width: 1440px)");

  return (
    <div className={styles.wrapper} style={{ backgroundColor: "var(--bg-gray)", minHeight: "100vh" }}>
      <div className={styles.backButtonWrapper}>
        <BackButton
          onClick={() => navigate("/transaction", { replace: true })}
        />
      </div>

      {isDesktop ? (
        <Grid
          rows={1}
          columns={1}
          gap="24px"
          style={{
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          {order && (
            <Grid
              rows={1}
              columns={7}
              style={{
                justifyContent: "center",
                gap: "24px",
              }}
            >
              <Grid columns={1} gap="0">
                <SellingItemCard
                  label={
                    order.splitterId === user.uid
                      ? "Selling Details"
                      : "Buying Details"
                  }
                  source={order.imageUrl}
                  alt={order.name}
                  itemName={order.name}
                  dateApproved={dateApproved}
                  price={order.price}
                  quantity={order.qty}
                />

                <BuyerContactCard
                  source={
                    order.splitterId === user.uid
                      ? order.splitteeImageUrl
                      : order.splitterImageUrl
                  }
                  alt="profile image"
                  label={
                    order.splitterId === user.uid
                      ? order.orderStatus === "completed"
                        ? "Sold to"
                        : "Selling to"
                      : order.orderStatus === "completed"
                      ? "Bought from"
                      : "Buying from"
                  }
                  nameOfBuyer={
                    order.splitterId === user.uid
                      ? order.splitteeName
                      : order.splitterName
                  }
                  contactTel={
                    order.orderStatus === "pending" ? (
                      <Typography color="error">
                        not available until confirmed
                      </Typography>
                    ) : order.orderStatus === "completed" ? (
                      <Typography>order is completed</Typography>
                    ) : order.orderStatus === "cancelled" ? (
                      <Typography color="error">order is cancelled</Typography>
                    ) : order.splitterId === user.uid ? (
                      order.orderStatus === "confirmed" ? (
                        order.splitteeContactNumber
                      ) : (
                        order.splitteeContactNumber
                      )
                    ) : (
                      order.splitterContactNumber
                    )
                  }
                  email={
                    order.orderStatus === "pending" ? (
                      <Typography color="error">
                        not available until confirmed
                      </Typography>
                    ) : order.orderStatus === "completed" ? (
                      <Typography>order is completed</Typography>
                    ) : order.orderStatus === "cancelled" ? (
                      <Typography color="error">order is cancelled</Typography>
                    ) : order.splitterId === user.uid ? (
                      order.orderStatus === "confirmed" ? (
                        order.splitteeEmail
                      ) : (
                        order.splitteeEmail
                      )
                    ) : (
                      order.splitterEmail
                    )
                  }
                />
              </Grid>

              <Grid style={{ gridColumn: "-7/-1" }}>
                <Card noborder nopadding>
                  <MeetUpInfoCard
                    date={meetUpDate}
                    time={meetUpTime}
                    location={order.meetUpAddress}
                    latitude={order.latitude}
                    longitude={order.longitude}
                  />
                </Card>
              </Grid>
            </Grid>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {order && order.splitterId === user.uid ? (
              <>
                {order.orderStatus === "completed" ||
                order.orderStatus === "cancelled" ? (
                  <></>
                ) : order.orderStatus === "pending" ? (
                  <>
                    <Button
                      variant="white"
                      label="Decline"
                      size="sm"
                      style={{ marginRight: ".5rem" }}
                      onClick={handleOnDecline}
                    />
                    <Button
                      variant="yellow"
                      label="Accept"
                      size="sm"
                      style={{ marginRight: ".5rem" }}
                      onClick={handleOnAccept}
                    />
                  </>
                ) : (
                  <div>
                    <Button
                      variant="white"
                      label="Cancel"
                      size="sm"
                      style={{ marginRight: ".5rem" }}
                      onClick={handleOnCancel}
                    />
                    <Button
                      variant="yellow"
                      label="Complete"
                      size="sm"
                      style={{ marginRight: ".5rem" }}
                      onClick={handleOnComplete}
                    />
                  </div>
                )}
              </>
            ) : order.orderStatus === "completed" ||
              order.orderStatus === "cancelled" ? (
              <></>
            ) : order.orderStatus === "pending" ? (
              <div>
                <Button
                  variant="white"
                  label="Cancel"
                  size="sm"
                  style={{ marginRight: ".5rem" }}
                  onClick={handleOnDecline}
                />
              </div>
            ) : (
              <div>
                <Button
                  variant="white"
                  label="Cancel"
                  size="sm"
                  style={{ marginRight: ".5rem" }}
                  onClick={handleOnCancel}
                />
                <Button
                  variant="yellow"
                  label="Complete"
                  size="sm"
                  style={{ marginRight: ".5rem" }}
                  onClick={handleOnComplete}
                />
              </div>
            )}
          </div>
        </Grid>
      ) : (
        <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-gray)" }}>
          {order && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <SellingItemCard
                  label={
                    order.splitterId === user.uid
                      ? "Selling Details"
                      : "Buying Details"
                  }
                  source={order.imageUrl}
                  alt={order.name}
                  itemName={order.name}
                  dateApproved={dateApproved}
                  price={order.price}
                  quantity={order.qty}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <BuyerContactCard
                  source={
                    order.splitterId === user.uid
                      ? order.splitteeImageUrl
                      : order.splitterImageUrl
                  }
                  alt="profile image"
                  label={
                    order.splitterId === user.uid
                      ? order.orderStatus === "completed"
                        ? "Sold to"
                        : "Selling to"
                      : order.orderStatus === "completed"
                      ? "Bought from"
                      : "Buying from"
                  }
                  nameOfBuyer={
                    order.splitterId === user.uid
                      ? order.splitteeName
                      : order.splitterName
                  }
                  contactTel={
                    order.orderStatus === "pending" ? (
                      <Typography color="error">
                        not available until confirmed
                      </Typography>
                    ) : order.orderStatus === "completed" ? (
                      <Typography>order is completed</Typography>
                    ) : order.orderStatus === "cancelled" ? (
                      <Typography color="error">order is cancelled</Typography>
                    ) : order.splitterId === user.uid ? (
                      order.orderStatus === "confirmed" ? (
                        order.splitteeContactNumber
                      ) : (
                        order.splitteeContactNumber
                      )
                    ) : (
                      order.splitterContactNumber
                    )
                  }
                  email={
                    order.orderStatus === "pending" ? (
                      <Typography color="error">
                        not available until confirmed
                      </Typography>
                    ) : order.orderStatus === "completed" ? (
                      <Typography>order is completed</Typography>
                    ) : order.orderStatus === "cancelled" ? (
                      <Typography color="error">order is cancelled</Typography>
                    ) : order.splitterId === user.uid ? (
                      order.orderStatus === "confirmed" ? (
                        order.splitteeEmail
                      ) : (
                        order.splitteeEmail
                      )
                    ) : (
                      order.splitterEmail
                    )
                  }
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Card noborder nopadding>
                  <MeetUpInfoCard
                    date={meetUpDate}
                    time={meetUpTime}
                    location={order.meetUpAddress}
                    latitude={order.latitude}
                    longitude={order.longitude}
                  />
                </Card>
              </div>

              <div style={{ paddingBottom: "20px" }}>
                {order && order.splitterId === user.uid ? (
                  <>
                    {order.orderStatus === "completed" ||
                    order.orderStatus === "cancelled" ? (
                      <></>
                    ) : order.orderStatus === "pending" ? (
                      <div style={{ display: "flex" }}>
                        <Button
                          variant="white"
                          label="Decline"
                          size="lg"
                          style={{ marginRight: ".5rem" }}
                          onClick={handleOnDecline}
                        />
                        <Button
                          variant="yellow"
                          label="Accept"
                          size="lg"
                          style={{ marginRight: ".5rem" }}
                          onClick={handleOnAccept}
                        />
                      </div>
                    ) : (
                      <div style={{ display: "flex" }}>
                        <Button
                          variant="white"
                          label="Cancel"
                          size="lg"
                          style={{ marginRight: ".5rem" }}
                          onClick={handleOnCancel}
                        />
                        <Button
                          variant="yellow"
                          label="Complete"
                          size="lg"
                          style={{ marginRight: ".5rem" }}
                          onClick={handleOnComplete}
                        />
                      </div>
                    )}
                  </>
                ) : order.orderStatus === "completed" ||
                  order.orderStatus === "cancelled" ? (
                  <></>
                ) : order.orderStatus === "pending" ? (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="white"
                      label="Cancel"
                      size="sm"
                      style={{ marginRight: ".5rem" }}
                      onClick={handleOnDecline}
                    />
                  </div>
                ) : (
                  <div style={{ display: "flex" }}>
                    <Button
                      variant="white"
                      label="Cancel"
                      size="lg"
                      style={{ marginRight: ".5rem" }}
                      onClick={handleOnCancel}
                    />
                    <Button
                      variant="yellow"
                      label="Complete"
                      size="lg"
                      style={{ marginRight: ".5rem" }}
                      onClick={handleOnComplete}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionDetail;
