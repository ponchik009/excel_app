import React from "react";
import readXlsxFile from "read-excel-file";

import "./App.css";
import Popup from "./components/Popup/Popup";

function App() {
  const [file, setFile] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [popupShow, setPopupShow] = React.useState(false);
  const [popupData, setPopupData] = React.useState(null);
  const [popupX, setPopupX] = React.useState(0);
  const [popupY, setPopupY] = React.useState(0);

  const onFileChange = React.useCallback(
    (e) => {
      setFile(e.target.files[0]);
    },
    [setFile]
  );

  const onCellClick = React.useCallback((e, value) => {
    console.log(e);
    setPopupX(e.clientX);
    setPopupY(e.clientY);
    setPopupData(Array(3).fill(Array(3).fill(value)));
    onPopupOpen();
  }, []);

  const onPopupClose = React.useCallback(() => {
    setPopupShow(false);
  }, []);

  const onPopupOpen = React.useCallback(() => {
    setPopupShow(true);
  }, []);

  React.useEffect(() => {
    if (file) {
      readXlsxFile(file).then(setData);
    }
  }, [file]);

  return (
    <div className="app">
      <input type="file" placeholder="Выберите файл" onChange={onFileChange} />
      {data && (
        <table>
          <tbody>
            {data.map((row) => (
              <tr key={Math.random()}>
                {row.map((value) => (
                  <td
                    key={Math.random()}
                    onClick={(e) => onCellClick(e, value)}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Popup
        open={popupShow}
        onClose={onPopupClose}
        data={popupData}
        x={popupX}
        y={popupY}
      />
    </div>
  );
}

export default App;
