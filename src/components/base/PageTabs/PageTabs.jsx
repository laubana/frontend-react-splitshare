import React, { useState } from "react";
import styles from "./PageTabs.module.css";

const { active } = styles;

const PageTabs = ({ tabs, onTabChange }) => {
  const [activeLink, setActiveLink] = useState(tabs[0]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    onTabChange(link);
  };

  return (
    <ul className={styles.ordertabs}>
      {tabs.map((item, index) => (
        <li key={index} className={activeLink === item ? active : ""}>
          <div onClick={() => handleLinkClick(item)}>{item}</div>
        </li>
      ))}
    </ul>
  );
};

export default PageTabs;
