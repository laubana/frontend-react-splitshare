import React from "react";
import Button from "../Button/Button";
import style from "./TransactionCard.module.css";
import Typography from "../Typography/Typography";

const TransactionCard = (props) => {
  const {
    type,
    source,
    itemName,
    time,
    portions,
    splitterName,
    price,
    onCancel,
    onDecline,
    onAccept,
    orderStatus,
    onComplete,
    onClick,
    orderType,
  } = props;

  const days = () => {
    if (time === "1") {
      return "a day ago";
    } else {
      return `${time} days ago`;
    }
  };

  const buttons = () => {
    if (type === "buying" && orderStatus === "pending") {
      return (
        <Button
          size="sm"
          variant="cancel"
          label="Cancel"
          onClickHandler={onCancel}
          hoverable
        />
      );
    } else if (
      (type === "buying" && orderStatus === "confirmed") ||
      (type === "selling" && orderStatus === "confirmed")
    ) {
      return (
        <>
          <Button
            size="sm"
            variant="decline"
            label="Cancel"
            onClickHandler={onDecline}
          />
          <Button
            size="sm"
            variant="accept"
            label="Complete"
            onClickHandler={onComplete}
            hoverable
          />
        </>
      );
    } else if (type === "selling" && orderStatus === "pending") {
      return (
        <>
          <Button
            size="sm"
            variant="decline"
            label="Decline"
            onClickHandler={onDecline}
            hoverable
          />
          <Button
            size="sm"
            variant="accept"
            label="Accept"
            onClickHandler={onAccept}
            hoverable
          />
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className={[style.transactionCard, { type }].join(" ")}>
      <div className={style.imageContainer} onClick={onClick}>
        <img src={source} alt="" />
      </div>
      <div className={style.productInformation} onClick={onClick}>
        <div>
          <Typography variant="h4-graphik-bold" color="dark-blue">
            {itemName.length > 20 ? itemName.substring(0,20)+"..." : itemName}
          </Typography>
          <Typography variant="h3-graphik-bold">
            ${Number(price).toFixed(2)}
          </Typography>
        </div>
        <Typography variant="body-1-medium">{days()}</Typography>
        <div className={style.quantity}>
          <Typography variant="h4-graphik-bold" color="gray">
            Quantity:
          </Typography>
          <Typography variant="body-2-regular">{portions}</Typography>
        </div>
        <div className={style.sellerContainer}>
          <Typography variant="h4-graphik-bold" color="gray">
            {orderType === "buying" ? "Seller:" : "Buyer:"}
          </Typography>
          <Typography variant="body-1-medium" color="dark-blue">
            {splitterName}
          </Typography>
        </div>
      </div>
      <div className={style.buttonContainer}>{buttons()}</div>
    </div>
  );
};

export default TransactionCard;
