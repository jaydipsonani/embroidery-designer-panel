import React, { useState, useEffect } from "react";
import styles from "./globalLoader.module.scss";
import classNames from "classnames";

const GlobalLoader = ({ isActive }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); 
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    isVisible && (
      <div
        className={classNames(
          styles.globalLoaderContainer,
          isActive && styles.active
        )}
      >
       <div className={styles.loader}>
        <div className={styles.loader_spinner}></div>
      </div>
      </div>
    )
  );
};

export default GlobalLoader;
