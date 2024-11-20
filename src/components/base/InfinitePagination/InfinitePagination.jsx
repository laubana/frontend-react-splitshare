import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import BeatLoader from "react-spinners/BeatLoader";
import styles from "./infinite-pagination.module.css";

const InfinitePagination = ({
  columns,
  items,
  onScroll,
  hasMore,
  gap,
  scrollThreshold = 1,
  style,
  ...props
}) => {
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={onScroll}
      hasMore={hasMore}
      scrollThreshold={scrollThreshold}
      loader={
        <div className={`${styles.spinner}`} style={{ textAlign: "center" }}>
          <BeatLoader color="#1c2aae" />
        </div>
      }
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>No more items.</b>
        </p>
      }
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap, ...style }}
      className={`${styles.wrapper}`}
    >
      {items}
    </InfiniteScroll>
  );
};

export default React.memo(InfinitePagination);
