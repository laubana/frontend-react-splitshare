import React from "react";
import Typography from "../../base/Typography/Typography";
import Badge from "../../base/Badge/Badge";
import MapSearch from "../../base/MapSearch/MapSearch";
import SelectDropdown from "../../base/SelectDropdown/SelectDropdown";
import style from "./filter.module.css";
import { useState } from "react";
import { Sort } from "../../../context/SortContext";
import { useEffect } from "react";

const Filter = ({
  onChange,
  options,
  placeholder,
  screenSize,
  dropdownPosition,
}) => {
  const [highActive, setHighActive] = useState(false);
  const [lowActive, setLowActive] = useState(false);

  const { updateSortValue } = Sort();

  useEffect(() => {
    if (!lowActive && !highActive) updateSortValue("");
    if (highActive) updateSortValue("highToLow");
    if (lowActive) updateSortValue("lowToHigh");
  }, [highActive, lowActive, updateSortValue]);

  return (
    <div className={screenSize ? style.filterWrapperFlex : style.filterWrapper}>
      <div>
        <Typography color="white" variant="h4-graphik-bold">
          Sort By
        </Typography>
        <div className={style.badgeContainer}>
          <Badge
            label="Price - High to Low"
            onClick={() => {
              setHighActive(!highActive);
              setLowActive(false);
            }}
            active={highActive}
          />
          <Badge
            label="Price - Low to High"
            onClick={() => {
              setLowActive(!lowActive);
              setHighActive(false);
            }}
            active={lowActive}
          />
        </div>
      </div>
      <div>
        <Typography color="white" variant="h4-graphik-bold">
          Location
        </Typography>
        <div className={style.mapContainer}>
          <MapSearch height="36px" bottom resetAddressInfo={() => null} />
          {/* <SelectDropdown
            options={options}
            placeholder={placeholder}
            clearable
            backspaceDelete
            onChange={onChange}
            searchable={false}
          /> */}
        </div>
      </div>
      <div>
        <Typography color="white" variant="h4-graphik-bold">
          Category
        </Typography>
        <div className={style.selectContainer}>
          <SelectDropdown
            options={options}
            placeholder={placeholder}
            clearable
            backspaceDelete
            onChange={onChange}
            searchable={false}
            dropdownPosition={dropdownPosition}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
