import React, { useEffect, useState } from "react";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import styles from "./mapSearch.module.css";
import SearchField from "../SearchField/SearchField";
import { Place } from "../../../context/PlaceContext";

const { wrapper, predictionBottom, predictionTop, predictionItem } = styles;

const MapSearch = ({
  placeholder = "Search location",
  height,
  bottom = false,
  newValue,
  resetAddressInfo,
}) => {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = useGoogle({
    apiKey: process.env.REACT_APP_MAPS_API_KEY,
  });
  const [value, setValue] = useState("");
  const { updatePlaceValue } = Place();

  useEffect(() => {
    if (newValue) {
      setValue(newValue);
    }
  }, [newValue]);

  const handleReset = () => {
    setValue("");
    getPlacePredictions({
      input: "",
      options: {
        componentRestrictions: { country: "CA" },
      },
    });
    updatePlaceValue("");
    resetAddressInfo();
  };

  const handleSelectPlace = (item) => {
    getPlacePredictions({ input: "" });
    setValue(item.description);
    placesService?.getDetails(
      {
        placeId: item.place_id,
      },
      (placeDetails) => updatePlaceValue(placeDetails)
    );
  };
  return (
    <div className={wrapper}>
      <SearchField
        value={value}
        resetValue={handleReset}
        onChange={(evt) => {
          getPlacePredictions({ input: evt.target.value });
          setValue(evt.target.value);
        }}
        placeholder={placeholder}
        location
        height={height}
      />
      <div className={bottom ? predictionBottom : predictionTop}>
        {!isPlacePredictionsLoading &&
          placePredictions.map((item) => (
            <div
              className={predictionItem}
              key={item.description}
              onClick={() => handleSelectPlace(item)}
            >
              {item.description}
            </div>
          ))}
      </div>
    </div>
  );
};

export default React.memo(MapSearch);
