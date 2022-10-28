import React from "react";
import ReactDOM from "react-dom";

import styles from "./Popup.module.css";

const Popup = ({ x, y, data, open, onClose }) => {
  return ReactDOM.createPortal(
    <>
      {open && (
        <div className={styles.wrapper} onClick={onClose}>
          <div
            className={styles.popup}
            style={{ left: `${x}px`, top: `${y}px` }}
            onClick={(event) => event.stopPropagation()}
          >
            <span className={styles.close} onClick={onClose}>
              X
            </span>
            {data && (
              <table>
                <tbody>
                  {data.map((row) => (
                    <tr key={Math.random()}>
                      {row.map((value) => (
                        <td key={Math.random()}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export default Popup;
