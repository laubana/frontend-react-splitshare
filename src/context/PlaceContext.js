import React, { createContext, useContext, useState } from "react";

// Create the search context
const PlaceContext = createContext();

// Create the search context provider
export const PlaceProvider = ({ children }) => {
  const [placeValue, setPlaceValue] = useState("");

  const updatePlaceValue = (value) => {
    setPlaceValue(value);
  };

  return (
    <PlaceContext.Provider value={{ placeValue, updatePlaceValue }}>
      {children}
    </PlaceContext.Provider>
  );
};

export const Place = () => {
  return useContext(PlaceContext);
};
