import Typography from "../../../components/base/Typography/Typography";
import PageTabs from "../../../components/base/PageTabs/PageTabs";
import TransactionCard from "../../../components/base/TransactionCard/TransactionCard";
import { useNavigate } from "react-router-dom";
import SelectDropdown from "../../../components/base/SelectDropdown/SelectDropdown";
import style from "./TransactionList.module.css";
import Grid from "../../../components/layout/Grid/Grid";
import useMediaQuery from "../../../utils/useMediaQuery";
import { BeatLoader } from "react-spinners";

const TransactionList = (props) => {
  const {
    orderTypeOptions,
    onCancel,
    onDecline,
    onAccept,
    onComplete,
    orderResults,
    onChange,
    orderType,
    orderTabs,
    handleTabChange,
    user,
  } = props;

  const navigate = useNavigate();

  const lg = useMediaQuery("(min-width: 1137px");
  const md = useMediaQuery("(min-width: 753px) and (max-width: 1136px)");
  const sm = useMediaQuery("(max-width: 752px)");

  return (
    <div className={style.ordersList}>
      <div className={style.titleWrapper}>
        <Typography variant="h2-graphik-bold">Orders</Typography>
        <SelectDropdown
          options={orderTypeOptions}
          onChange={onChange}
          searchable={false}
          placeholder="Selling"
        />
        <PageTabs tabs={orderTabs} onTabChange={handleTabChange} />
      </div>

      {orderResults ? (
        orderResults.length > 0 ? (
          <Grid
            className={style.orders}
            columns={sm ? 1 : md ? 2 : lg ? 3 : 1}
            gap={sm ? "12px" : md ? "16px" : lg ? "16px" : "0"}
            style={{ alignItems: "center" }}
          >
            {orderResults.map((o) => {
              const today = new Date();
              let updatedAt = new Date(o.updatedAt.toDate());
              updatedAt.setHours(0, 0, 0, 0);
              today.setHours(0, 0, 0, 0);
              const timeDiff = today.getTime() - updatedAt.getTime();
              const days = Math.abs(
                Math.floor(timeDiff / (1000 * 60 * 60 * 24))
              );
              return (
                <TransactionCard
                  key={o.id}
                  type={o.splitteeId === user.uid ? "buying" : "selling"}
                  itemName={o.name}
                  time={days}
                  orderType={orderType}
                  portions={o.qty}
                  splitterName={
                    orderType === "selling" ? o.splitteeName : o.splitterName
                  }
                  price={o.price}
                  source={o.imageUrl}
                  orderStatus={o.orderStatus}
                  onCancel={() => onCancel(o.id, o.productId)}
                  onDecline={() => onDecline(o.id, o.productId)}
                  onAccept={() => onAccept(o.id, o.productId)}
                  onComplete={() => onComplete(o.id, o.productId)}
                  onClick={() => {
                    navigate(`/transaction/${o.id}`, {
                      state: {
                        id: o.id,
                        createdAt: o.createdAt,
                        splitteeName: o.splitteeName,
                        splitterName: o.splitterName,
                        imageUrl: o.imageUrl,
                        latitude: o.latitude,
                        longitude: o.longitude,
                        meetUpAddress: o.meetupAddress,
                        meetUpInfo: o.meetupSchedule,
                        name: o.name,
                        price: o.price,
                        qty: o.qty,
                        splitteeId: o.splitteeId,
                        splitteeContactNumber: o.splitteeContactNumber,
                        splitteeEmail: o.splitteeEmail,
                        splitteeImageUrl: o.splitteeImageUrl,
                        splitterContactNumber: o.splitterContactNumber,
                        splitterEmail: o.splitterEmail,
                        splitterId: o.splitterId,
                        splitterImageUrl: o.splitterImageUrl,
                        orderStatus: o.orderStatus,
                        productId: o.productId,
                        updatedAt: o.updatedAt,
                      },
                    });
                  }}
                />
              );
            })}
          </Grid>
        ) : (
          <div style={{ textAlign: "center", marginTop: "15%" }}>
            <Typography color="error" variant="h4-graphik-bold">
              You have no items here.
            </Typography>
          </div>
        )
      ) : (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <BeatLoader color="#1c2aae" />
        </div>
      )}
    </div>
  );
};

export default TransactionList;
