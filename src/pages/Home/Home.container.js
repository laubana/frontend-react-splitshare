/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import HomeView from "./Home.view";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../../utils/useMediaQuery";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import db from "../../config/firebaseConfig";
import { SearchContext } from "../../context/SearchContext";
import useDebounce from "../../utils/useDebounce";
import { useContext } from "react";
import { usePosition } from "../../utils/usePosition";
import { Category } from "../../context/CategoryContext";
import Geocode from "react-geocode";
import { Sort } from "../../context/SortContext";
import getDistance from "geolib/es/getDistance";
import getPreciseDistance from "geolib/es/getDistance";

import { Place } from "../../context/PlaceContext";

const Home = () => {
  const { user, logout } = UserAuth();
  const [zoom, setZoom] = useState(12);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const xl = useMediaQuery("(min-width: 1270px");
  const lg = useMediaQuery("(min-width: 769px) and (max-width: 1269px)");
  const md = useMediaQuery("(min-width: 600px) and (max-width: 768px)");
  const sm = useMediaQuery("(min-width: 360px) and (max-width: 599px");

  Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);
  Geocode.setLanguage("en");
  Geocode.setRegion("ca");

  const { placeValue, updatePlaceValue } = Place();
  const [locationFilter, setLocationFilter] = useState({
    latitude: "",
    longitude: "",
  });

  const navigate = useNavigate();
  const handleLogOut = async () => {
    await logout();
    navigate("/login");
  };

  // global search value
  const { searchValue } = useContext(SearchContext);
  const debouncedValue = useDebounce(searchValue, 500);

  //global category value
  const { categoryValue } = Category();

  // global sort value
  const { sortValue } = Sort();

  // start of location
  useEffect(() => {
    updatePlaceValue("");
  }, []);

  const { latitude, longitude, error } = usePosition();

  const [currentAddress, setCurrentAddress] = useState("");

  useEffect(() => {
    if (latitude && longitude) {
      Geocode.fromLatLng(latitude, longitude).then(
        (response) => {
          const address = response.results[0].formatted_address;
          setCurrentAddress(address);
        },
        (error) => {
          setCurrentAddress("");
          console.error(error);
        }
      );
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (placeValue?.formatted_address) {
      Geocode.fromAddress(placeValue.formatted_address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setLocationFilter({ latitude: lat, longitude: lng });
        },
        (error) => {
          setLocationFilter({ latitude: "", longitude: "" });
          console.error(error);
        }
      );
    } else {
      setLocationFilter({ latitude: "", longitude: "" });
    }
  }, [placeValue]);

  // end of location

  // /**************** */

  const sorting = (sv) => {
    if (!!sv) {
      return orderBy(
        "price",
        sortValue === "lowToHigh"
          ? "asc"
          : sortValue === "highToLow"
          ? "desc"
          : "desc"
      );
    } else {
      return orderBy("createdAt", "asc");
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "product"), sorting(sortValue)),
      (snapshot) => {
        let newProducts = snapshot.docs
          .filter((doc) => doc.data().qty !== 0)
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

        let result = newProducts;

        if (!!debouncedValue) {
          result = result.filter((n) =>
            n.name.toLowerCase().includes(debouncedValue.toLowerCase())
          );
        }

        if (categoryValue.length > 0) {
          result = result.filter((n) =>
            n.categoryValue
              .toLowerCase()
              .includes(categoryValue[0]?.value.toLowerCase())
          );
        }

        if (locationFilter.latitude && locationFilter.longitude) {
          result = result.filter((product) => {
            let tmp = {
              latitude: product.location._lat,
              longitude: product.location._long,
            };

            let locFilter = {
              latitude: locationFilter.latitude,
              longitude: locationFilter.longitude,
            };
            const distance = getPreciseDistance(locFilter, tmp);

            return distance <= 25000;
          });
        }

        if (currentAddress && sortValue === "") {
          result = result.sort((a, b) => {
            const distanceA = getPreciseDistance(
              { latitude, longitude },
              { latitude: a.location._lat, longitude: a.location._long }
            );
            const distanceB = getPreciseDistance(
              { latitude, longitude },
              { latitude: b.location._lat, longitude: b.location._long }
            );

            return distanceA - distanceB;
          });
        }
        setProducts(result);
      }
    );

    return () => unsubscribe();
  }, [
    debouncedValue,
    categoryValue,
    sortValue,
    locationFilter.latitude,
    locationFilter.longitude,
    currentAddress,
    locationFilter,
  ]);

  const desktopProducts = products;

  const desktopBounds =
    desktopProducts.length !== 0
      ? desktopProducts.map((product) => [
          product.location._lat,
          product.location._long,
        ])
      : [[49.225693, -123.107326]];

  const columns = sm ? 2 : md ? 3 : lg ? 4 : xl ? 5 : 2;

  const handleOnClick = (pageIndex) => {
    setCurrentPageIndex(pageIndex);
  };

  const [toggleDisplay, setToggleDisplay] = useState(true);

  const toggleDisplayHandler = () => {
    setToggleDisplay(!toggleDisplay);
  };

  const generatedProps = {
    user,
    desktopProducts,
    hasMore,
    columns,
    lg,
    xl,
    zoom,
    currentPageIndex,
    desktopBounds,
    latitude,
    longitude,
    error,
    handleLogOut,
    handleOnClick,
    categories,
    currentAddress,
    toggleDisplayHandler,
    toggleDisplay,
    debouncedValue,
    categoryValue,
    locationFilter,
  };
  return <HomeView {...generatedProps} />;
};

export default Home;
