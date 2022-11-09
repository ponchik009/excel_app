import React from "react";
import ReactDOM from "react-dom";

import styles from "./PopupEdit.module.css";

const Colors = ["white", "#FFFF00", "#92D050"];

const PopupEdit = ({
  x,
  y,
  text = "",
  open,
  onClose,
  selectedColor = "white",
}) => {
  const [value, setValue] = React.useState(text);
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
            <div className={styles.colors}>
              {Colors.map((color) => (
                <div
                  style={{
                    background: color,
                    height: "50px",
                    width: "50px",
                    cursor: "pointer",
                    marginBottom: "16px",
                  }}
                  className={selectedColor === color && styles.active}
                ></div>
              ))}
            </div>
            <textarea
              name="text"
              id="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></textarea>
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export default PopupEdit;
