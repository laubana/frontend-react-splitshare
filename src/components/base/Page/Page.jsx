import React from "react";
import styles from "./page.module.css";

const Page = ({ items, columns, ...props }) => {
  return (
    <table className={`${styles["item-list"]}`}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.length !== 0 &&
          items.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column}>{String(item[column])}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default React.memo(Page);
