import React, { useEffect, useState } from "react";
import { doc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import db from "../../../config/firebaseConfig";
import { UserAuth } from "../../../context/AuthContext";
import TransactionDetailView from "./TransactionDetail.view";

const TransactionDetail = () => {
  const location = useLocation();
  const [order, setOrder] = useState(location.state);
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const orderStatusRef = doc(db, "order", transactionId);
  const { user } = UserAuth();
  const [meetUpDate, setMeetUpDate] = useState();
  const [meetUpTime, setMeetUpTime] = useState();
  const [dateApproved, setdateApproved] = useState();

  useEffect(() => {
    if (order && order.updatedAt) {
      setdateApproved(
        new Date(order.updatedAt.seconds * 1000).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      );
    }
  }, [order]);

  useEffect(() => {
    if (order && order.meetUpInfo) {
      setMeetUpDate(
        new Date(order.meetUpInfo.seconds * 1000).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      );

      setMeetUpTime(
        new Date(order.meetUpInfo.seconds * 1000).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      );
    }
  }, [order]);

  useEffect(() => {
    if (user) {
    } else {
      console.log("error");
    }
  }, [user]);

  const handleOnDecline = async () => {
    console.log("Declined");
    try {
      await updateDoc(orderStatusRef, {
        orderStatus: "cancelled",
        updatedAt: serverTimestamp(),
      });
      setOrder((oldData) => ({ ...oldData, orderStatus: "cancelled" }));

      console.log("Order status and quantity updated successfully");
    } catch (error) {
      console.error("Failed to update order status and quantity:", error);
    }
  };

  const handleOnCancel = async () => {
    try {
      const docRef = doc(db, "product", order.productId);
      await updateDoc(docRef, {
        updatedAt: serverTimestamp(),
      });
      await updateDoc(orderStatusRef, {
        orderStatus: "cancelled",
        updatedAt: serverTimestamp(),
      });
      setOrder((oldData) => ({ ...oldData, orderStatus: "cancelled" }));

      console.log("Order status and quantity updated successfully");
    } catch (error) {
      console.error("Failed to update order status and quantity:", error);
    }
  };

  const handleOnAccept = async () => {
    try {
      console.log(order.productId);
      const docRef = doc(db, "product", order.productId);
      await updateDoc(docRef, {
        qty: increment(-order.qty),
      });
      await updateDoc(orderStatusRef, {
        orderStatus: "confirmed",
        updatedAt: serverTimestamp(),
      });
      await updateDoc(orderStatusRef, { orderStatus: "confirmed" });
      setOrder((oldData) => ({ ...oldData, orderStatus: "confirmed" }));

      console.log("Order status and quantity updated successfully");
    } catch (error) {
      console.error("Failed to update order status and quantity:", error);
    }
  };

  const handleOnComplete = async () => {
    try {
      await updateDoc(orderStatusRef, {
        orderStatus: "completed",
        updatedAt: serverTimestamp(), // Include the updated date with serverTimestamp()
      });
      setOrder((oldData) => ({ ...oldData, orderStatus: "completed" }));
      console.log("Order status updated successfully");
    } catch (error) {
      console.error("Order status fail to update");
    }
  };

  //   const handleOnDecline = async () => {
  //     console.log("Declined");
  //     updateDoc(orderStatusRef, { orderStatus: "cancelled" }).then((response) => {
  //       setOrder((oldData) => ({ ...oldData, orderStatus: "cancelled" }));
  //       console.log(response);
  //     });
  //     console.log("Order status updated successfully");
  //   };

  //   const handleOnAccept = async () => {
  //     updateDoc(orderStatusRef, { orderStatus: "confirmed" }).then((response) => {
  //     setOrder((oldData) => ({ ...oldData, orderStatus: "confirmed" }));
  //   });
  //   console.log("Order status updated successfully");
  // };

  //   const handleOnComplete = async () => {
  //     updateDoc(orderStatusRef, { orderStatus: "completed" }).then((response) => {
  //     setOrder((oldData) => ({ ...oldData, orderStatus: "completed" }));
  //   });
  //   console.log("Order status updated successfully");
  // };

  // useEffect(() => {
  //   if (!order || !order.id) {
  //     navigate("/transaction");
  //   }
  // }, [order, navigate]);

  // console.log(order);
  const generatedProps = {
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
  };

  return <TransactionDetailView {...generatedProps} />;
};

export default TransactionDetail;
