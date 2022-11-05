import React from "react";
import Excel from "exceljs";

import "./App.css";
import Popup from "./components/Popup/Popup";

function App() {
  const [file, setFile] = React.useState(null);
  const [file2, setFile2] = React.useState(null);

  const [data, setData] = React.useState(null);
  const [data2, setData2] = React.useState(null);

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

  const onFileChange2 = React.useCallback(
    (e) => {
      setFile2(e.target.files[0]);
    },
    [setFile2]
  );

  const onCellClick = React.useCallback(
    (e, value, index, row) => {
      const customerName = row[2].value;
      const dataToFill = [data2[0]];
      for (let i = 1; i < data2.length; i++) {
        if (
          data2[i].some((cell) => {
            return cell.value === customerName;
          })
        ) {
          dataToFill.push(data2[i]);
        }
      }
      setPopupX(e.pageX);
      setPopupY(e.pageY);
      setPopupData(dataToFill);
      onPopupOpen();
    },
    [data2]
  );

  const onPopupClose = React.useCallback(() => {
    setPopupShow(false);
  }, []);

  const onPopupOpen = React.useCallback(() => {
    setPopupShow(true);
  }, []);

  React.useEffect(() => {
    if (file) {
      // readXlsxFile(file).then(setData);

      const workbook = new Excel.Workbook();
      workbook.xlsx
        .load(file)
        .then((data) => {
          return data.worksheets[0]
            .getRows(0, data.worksheets[0].lastRow.number)
            .map((row) => {
              // row.values.map((_, index) =>
              //   console.log(row.getCell(index).value)
              // );
              return row.values.map((_, index) => row.getCell(index));
            })
            .filter((row) => row.length !== 0);
        })
        .then((rows) => {
          for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows[i].length; j++) {
              if (!rows[i][j]) {
                rows[i][j] = "";
              }
            }
          }
          console.log(rows);
          setData(rows);
        });
    }
  }, [file]);

  React.useEffect(() => {
    if (file2) {
      // readXlsxFile(file2).then(setData2);

      const workbook = new Excel.Workbook();
      workbook.xlsx
        .load(file2)
        .then((data) => {
          const rows = [];
          workbook.eachSheet(function (worksheet, sheetId) {
            rows.push(...worksheet.getRows(0, worksheet.lastRow.number));
          });
          return rows
            .map((row) => {
              // row.values.map((_, index) =>
              //   console.log(row.getCell(index).value)
              // );
              return row.values.map((_, index) => row.getCell(index));
            })
            .filter((row) => row.length !== 0);
        })
        .then((rows) => {
          for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows[i].length; j++) {
              if (!rows[i][j]) {
                rows[i][j] = "";
              }
            }
          }
          console.log(rows);
          setData2(rows);
        });
    }
  }, [file2]);

  return (
    <div className="app">
      <input type="file" placeholder="Выберите файл" onChange={onFileChange} />
      <input
        type="file"
        placeholder="Выберите файл 2"
        onChange={onFileChange2}
      />
      {data && Array.isArray(data) && (
        <table>
          <tbody>
            {data.map((row) => (
              <tr key={Math.random()}>
                {row.map((cell, index, arr) => {
                  // console.log(cell.value, cell?.style);
                  return (
                    <td
                      key={Math.random()}
                      onClick={(e) => onCellClick(e, cell.value, index, arr)}
                      className="clickableCell"
                      style={{
                        backgroundColor: `${
                          String(
                            "#" + cell?.style?.fill?.fgColor?.argb?.substring(2)
                          ) || "white"
                        }`,
                      }}
                    >
                      {typeof cell.value === "object"
                        ? cell.value.result || 0
                        : cell.value}
                    </td>
                  );
                })}
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
