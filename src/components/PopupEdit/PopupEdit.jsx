import React from "react";
import ReactDOM from "react-dom";

import styles from "./PopupEdit.module.css";

const Colors = ["#FFFFFF", "#FFFF00", "#92D050"];

const PopupEdit = ({
  x,
  y,
  text = "",
  open,
  onClose,
  selectedColor = "#FFFFFF",
  cell = null,
  setData,
  i,
  j,
}) => {
  const [value, setValue] = React.useState(
    typeof cell.value === "object" ? cell.value.result || 0 : cell.value
  );
  const [currentColor, setCurrentColor] = React.useState(
    cell?.style?.fill?.fgColor?.argb?.substring(2)
      ? "#" + String(cell?.style?.fill?.fgColor?.argb?.substring(2))
      : "#FFFFFF"
  );

  React.useEffect(() => {
    console.log(cell);
    setValue(
      typeof cell.value === "object" ? cell.value.result || 0 : cell.value
    );
    setCurrentColor(
      cell?.style?.fill?.fgColor?.argb?.substring(2)
        ? "#" + String(cell?.style?.fill?.fgColor?.argb?.substring(2))
        : "#FFFFFF"
    );
  }, [cell]);

  const onOkClick = () => {
    setData((prev) =>
      prev.map((row, i1) =>
        row.map((c, i2) => {
          return i1 === i && i2 === j
            ? {
                ...c,
                value,
                style: {
                  ...c.style,
                  fill: {
                    ...c.style?.fill,
                    pattern: "solid",
                    type: "pattern",
                    fgColor: {
                      ...c.style?.fill?.fgColor,
                      argb: "FF" + currentColor.substring(1),
                    },
                  },
                },
              }
            : c;
        })
      )
    );
    onClose();
  };

  return ReactDOM.createPortal(
    <>
      {open && cell && (
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
                  className={currentColor === color && styles.active}
                  key={color}
                  onClick={() => setCurrentColor(color)}
                ></div>
              ))}
            </div>
            <textarea
              name="text"
              id="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></textarea>
            <button style={{ display: "block" }} onClick={onOkClick}>
              OK
            </button>
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export default PopupEdit;
