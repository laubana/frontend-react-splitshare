import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import store from "../../../config/firebaseConfig";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  where,
  getDocs,
  deleteDoc,
  query,
  serverTimestamp,
  Timestamp,
  GeoPoint,
  updateDoc,
  increment,
} from "firebase/firestore";
import { UserAuth } from "../../../context/AuthContext";
import ListDetailView from "./ListingDetail.view";

const ListingDetail = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = UserAuth();
  const [product, setProduct] = useState(location.state);
  const [seller, setSeller] = useState();
  const [quantity, setQuantity] = useState(1);
  const [isRequested, setIsRequested] = useState();
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [orderQty, setOrderQty] = useState(0);
  const [carouselVisibility, setCarouselVisibility] = useState(false);
  const [requestVisibility, setRequestVisibility] = useState(false);
  const [cancelRequestVisibility, setCancelRequestVisibility] = useState(false);
  const [cancelTransactionVisibility, setCancelTransactionVisibility] =
    useState(false);

  useEffect(() => {
    if (!product) {
      navigate("/");
    } else {
      getDoc(doc(store, "user", product.createdByIdent))
        .then((sellerResponse) => {
          getDocs(
            query(
              collection(store, "order"),
              where("splitterId", "==", product.createdByIdent),
              where("orderStatus", "==", "completed")
            )
          ).then((itemsResponse) => {
            setSeller({
              ...sellerResponse.data(),
              qty: itemsResponse.docs.length,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (user.uid) {
      getDocs(
        query(
          collection(store, "order"),
          where("orderStatus", "in", ["pending", "confirmed"]),
          where("productId", "==", product.id),
          where("splitteeId", "==", user.uid)
        )
      ).then((orderResponse) => {
        if (orderResponse.empty) {
          setIsRequested(false);
          setOrderStatus("");
          setOrderQty(0);
        } else {
          setIsRequested(true);
          setOrderId(orderResponse.docs[0].id);
          setOrderStatus(orderResponse.docs[0].data().orderStatus);
          setOrderQty(orderResponse.docs[0].data().qty);
        }
      });
    }
  }, [user, product]);

  const handleOnOpen = () => {
    setCarouselVisibility(true);
  };

  const handleOnClose = () => {
    setCarouselVisibility(false);
  };

  const handleOnOpenRequest = () => {
    setRequestVisibility(true);
  };

  const handleOnConfirmRequest = () => {
    if (0 < quantity && quantity <= product.qty) {
      const time = serverTimestamp();

      getDoc(doc(store, "user", user.uid)).then((userResponse) => {
        addDoc(collection(store, "order"), {
          createdAt: time,
          imageUrl: product.images[0],
          latitude: product.latitude,
          location: new GeoPoint(product.latitude, product.longitude),
          longitude: product.longitude,
          meetupAddress: product.meetUpAddress,
          meetupSchedule: new Timestamp(
            product.meetUpInfo.seconds,
            product.meetUpInfo.nanoseconds
          ),
          name: product.name,
          orderStatus: "pending",
          price: product.price,
          productId: product.id,
          qty: Number(quantity),
          splitteeContactNumber: userResponse.data().contactNumber,
          splitteeEmail: userResponse.data().email,
          splitteeId: userResponse.data().id,
          splitteeImageUrl: userResponse.data().imageUrl,
          splitteeName: userResponse.data().displayName,
          splitterContactNumber: seller.contactNumber,
          splitterEmail: seller.email,
          splitterId: seller.id,
          splitterImageUrl: seller.imageUrl,
          splitterName: seller.displayName,
          updatedAt: time,
        }).then((orderResponse) => {
          updateDoc(doc(store, "order", orderResponse.id), {
            orderId: orderResponse.id,
          }).then((response) => {
            setIsRequested(true);
            setOrderId(orderResponse.id);
            setOrderStatus("pending");
            setOrderQty(quantity);
            setRequestVisibility(false);
          });
        });
      });
    }
  };

  const handleOnCloseRequest = () => {
    setRequestVisibility(false);
  };

  const handleOnOpenCancelRequest = () => {
    setCancelRequestVisibility(true);
  };

  const handleOnOpenCancelTransaction = () => {
    setCancelTransactionVisibility(true);
  };

  const handleOnConfirmCancelRequest = () => {
    updateDoc(doc(store, "order", orderId), {
      orderStatus: "cancelled",
    }).then((cancelResponse) => {
      setIsRequested(false);
      setOrderId("");
      setOrderStatus("");
      setOrderQty(0);
      setCancelRequestVisibility(false);
    });
  };

  const handleOnConfirmCancelTransaction = () => {
    updateDoc(doc(store, "order", orderId), {
      orderStatus: "cancelled",
    }).then((cancelResponse) => {
      updateDoc(doc(store, "product", product.id), {
        qty: increment(orderQty),
      }).then((updateResponse) => {
        setIsRequested(false);
        setOrderId("");
        setOrderStatus("");
        setOrderQty(0);
        setCancelTransactionVisibility(false);
      });
    });
  };

  const handleOnCloseCancelRequest = () => {
    setCancelRequestVisibility(false);
  };

  const handleOnCloseCancelTransaction = () => {
    setCancelTransactionVisibility(false);
  };

  const generatedProps = {
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
  };
  return <ListDetailView {...generatedProps} />;
};

export default ListingDetail;
