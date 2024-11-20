import React, { createContext, useContext, useState } from "react";

// Create the search context
const SortContext = createContext();

// Create the search context provider
export const SortProvider = ({ children }) => {
  const [sortValue, setSortValue] = useState("");

  const updateSortValue = (value) => {
    setSortValue(value);
  };

  return (
    <SortContext.Provider value={{ sortValue, updateSortValue }}>
      {children}
    </SortContext.Provider>
  );
};

export const Sort = () => {
  return useContext(SortContext);
};
