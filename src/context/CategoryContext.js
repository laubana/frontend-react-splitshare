import React, { createContext, useContext, useState } from "react";

// Create the search context
const CategoryContext = createContext();

// Create the search context provider
export const CategoryProvider = ({ children }) => {
  const [categoryValue, setCategoryValue] = useState("");

  const updateCategoryValue = (value) => {
    setCategoryValue(value);
  };

  return (
    <CategoryContext.Provider value={{ categoryValue, updateCategoryValue }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const Category = () => {
  return useContext(CategoryContext);
};
