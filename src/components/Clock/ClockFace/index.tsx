import styles from './clockface.module.scss'
import React from "react";

interface Props {
  children?: JSX.Element
}

const ClockFace:React.FC<Props> = ({children}) => {
  const numbers = Array.from(Array(12)).map((_, i) => i + 1)

  return (
      <div className={styles["clock-face"]}>
        {numbers.map(number => (
            <div key={number} className={`${styles['number']} ${styles[`number-${number}`]}`}>
              {number}
            </div>
        ))}
        {children}
      </div>
  );
};

export default ClockFace;
