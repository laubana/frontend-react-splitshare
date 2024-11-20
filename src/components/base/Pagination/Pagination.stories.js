import React, { useState } from "react";
import Pagination from "./Pagination";

export default {
  title: "Base/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
};

export const Desktop = (props) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(15);
  const [maxPageNumber, setMaxPageNumber] = useState(5);
  const [totalPageNumber, setTotalPageNumber] = useState(30);

  const handleOnClick = (pageIndex) => {
    setCurrentPageIndex(pageIndex);
  };

  return (
    <div>
      <Pagination
        currentPageIndex={currentPageIndex}
        test={maxPageNumber}
        totalPageNumber={totalPageNumber}
        onClick={handleOnClick}
      ></Pagination>
    </div>
  );
};

export const Mobile = (props) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(15);
  const [maxPageNumber, setMaxPageNumber] = useState(3);
  const [totalPageNumber, setTotalPageNumber] = useState(30);

  const handleOnClick = (pageIndex) => {
    setCurrentPageIndex(pageIndex);
  };

  return (
    <div>
      <Pagination
        currentPageIndex={currentPageIndex}
        test={maxPageNumber}
        totalPageNumber={totalPageNumber}
        previousButtonLabel="<"
        nextButtonLabel=">"
        onClick={handleOnClick}
      ></Pagination>
    </div>
  );
};
