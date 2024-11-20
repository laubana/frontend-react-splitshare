import React from "react";
import styles from "./pagination.module.css";

const Pagination = ({
  currentPageIndex,
  pageNumber,
  totalPageNumber,
  onClick,
  ...props
}) => {
  const bias = Math.floor(pageNumber / 2);
  const pages = [];
  for (let i = currentPageIndex - bias; i <= currentPageIndex + bias; i++) {
    if (1 <= i && i <= totalPageNumber) {
      pages.push(i);
    }
  }

  return (
    <ul className={`${styles.wrapper}`}>
      {1 < currentPageIndex && (
        <li>
          <button
            className={`${styles.btn} ${styles.previous}`}
            onClick={() => onClick(currentPageIndex - 1)}
            style={props}
          >
            &lt; Previous
          </button>
        </li>
      )}
      {pages.map((item, index) => {
        if (item === currentPageIndex) {
          return (
            <li key={index}>
              <button
                className={`${styles.btn} ${styles.number} ${styles.active}`}
                onClick={() => onClick(item)}
                style={props}
              >
                {item}
              </button>
            </li>
          );
        } else {
          return (
            <li key={index}>
              <button
                className={`${styles.btn} ${styles.number} ${styles.inactive}`}
                onClick={() => onClick(item)}
                style={props}
              >
                {item}
              </button>
            </li>
          );
        }
      })}
      {currentPageIndex < totalPageNumber && (
        <li>
          <button
            className={`${styles.btn} ${styles.next}`}
            onClick={() => onClick(currentPageIndex + 1)}
            style={props}
          >
            Next &gt;
          </button>
        </li>
      )}
    </ul>
  );
};

export default React.memo(Pagination);
