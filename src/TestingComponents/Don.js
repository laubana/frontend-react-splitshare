import React, { useState } from "react";
import FirebaseSample from "../config/FirebaseSample";
import SearchField from "../components/base/SearchField/SearchField";
import ActiveListingCard from "../components/base/ActiveListingCard/ActiveListingCard";
import Badge from "../components/base/Badge/Badge";
import MapSearch from "../components/base/MapSearch/MapSearch";
import "leaflet/dist/leaflet.css";
import Grid from "../components/layout/Grid/Grid";
import useMediaQuery from "../utils/useMediaQuery";
import SelectDropdown from "../components/base/SelectDropdown/SelectDropdown";
import BottomNav from "../components/layout/BottomNav/BottomNav";
import Filter from "../components/module/Filter/Filter";
import CarouselSwiper from "../components/module/CarouselSwiper/CarouselSwiper";

const wrapper = {
  padding: "1rem",
};

const Don = (props) => {
  const [selected, setSelected] = useState(false);
  const [selected1, setSelected1] = useState(false);

  const options = [
    {
      value: 1,
      label: "Leanne Graham",
    },
    {
      value: 2,
      label: "Ervin Howell",
    },
  ];

  const [searchValue, setSearchValue] = useState("");
  const [sortHigh, setSortHigh] = useState(false);
  const [sortLow, setSortLow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const isTablet = useMediaQuery("(min-width: 960px)");
  const isMobile = useMediaQuery("(min-width: 360px)");

  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div>
      <h1>Don</h1>
      <div>
        <FirebaseSample />
      </div>
      <div style={wrapper}>
        <SearchField
          placeholder="What are you looking for?"
          onChange={(e) => {
            setSearchValue(e.target.value);
            console.log(e.target.value);
          }}
          value={searchValue}
          resetValue={() => setSearchValue("")}
        />
      </div>

      <div style={wrapper}>
        <MapSearch />
      </div>
      {/* <div style={wrapper}>
        <MapLeaflet
          style={{ height: "50rem", width: "50rem" }}
          zoom={zoom}
          markerData={data}
          direction="top"
          // permanent
        />
      </div> */}

      <div style={wrapper}>
        <Grid
          rows={2}
          columns={isDesktop ? 6 : isTablet ? 3 : isMobile ? 2 : "auto"}
          style={{ justifyItems: "center" }}
        >
          <div>Cell 1</div>
          <div>Cell 2</div>
          <div>Cell 3</div>
          <div>Cell 4</div>
          <div>Cell 5</div>
          <div>Cell 6</div>
          <div>Cell 7</div>
          <div>Cell 8</div>
          <div>Cell 9</div>
        </Grid>
      </div>

      <div style={wrapper}>
        <SelectDropdown
          options={options}
          placeholder="Search location.."
          clearable
          backspaceDelete
          onChange={(value) => console.log(value)}
          searchable={false}
        />
      </div>
      <div style={wrapper}>
        <Badge
          label="Nearby"
          onClick={() => setSelected(!selected)}
          active={selected}
        />
        <Badge
          label="Price - High to Low"
          onClick={() => setSelected1(!selected1)}
          active={selected1}
        />
      </div>
      <div style={wrapper}>
        <ActiveListingCard
          distance={2}
          days={2}
          source="https://picsum.photos/400"
          itemname="Banana"
          price={1.25}
          stock={5}
          alt="Banana"
          onClick={() => console.log("activelistingcard")}
        />
        <ActiveListingCard
          distance={2}
          days={2}
          source="https://picsum.photos/400"
          itemname="Banana"
          price={1.25}
          stock={5}
          alt="Banana"
          onClick={() => console.log("activelistingcard")}
          maxW="250px"
          width="250px"
        />
        {/* <ImageLabel distance={2} days={1} /> */}
        <BottomNav />
      </div>

      <div style={wrapper}>
        <div>
          <button onClick={() => setOpenFilter(!openFilter)}>
            open filter
          </button>
        </div>
        <div
          style={{
            maxHeight: openFilter ? "1000px" : "0",
            overflow: "hidden",
            transition: "max-height 0.3s ease-in-out",
          }}
        >
          {openFilter && (
            <Filter
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              options={options}
              sortLowHandler={() => {
                console.log("sorted low handler");
                setSortLow(!sortLow);
              }}
              sortHighHandler={() => {
                console.log("sorted high handler");
                setSortHigh(!sortHigh);
              }}
              sortHigh={sortHigh}
              sortLow={sortLow}
            />
          )}
        </div>
      </div>

      <div
        style={{
          width: "250px",
          height: "auto",
          ...wrapper,
        }}
      >
        <CarouselSwiper />
      </div>
    </div>
  );
};

export default Don;
