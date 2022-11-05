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
                      {row.map((cell, index, arr) => (
                        <td
                          key={Math.random()}
                          className="clickableCell"
                          style={{
                            backgroundColor: `${
                              String(
                                "#" +
                                  cell?.style?.fill?.fgColor?.argb?.substring(2)
                              ) || "white"
                            }`,
                          }}
                        >
                          {typeof cell.value === "object"
                            ? cell.value.result || 0
                            : cell.value}
                        </td>
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
