import React from "react";
import { RowDataProps, ApiResponse } from "./types";
import "bootstrap/dist/css/bootstrap.css";

export const DetailData: React.FC<{
  RowData: RowDataProps;
  position: string;
}> = (rowData, position) => {
  return (
    <React.Fragment>
      <div className="nav right" style={{ marginTop: 500 }}>
        <div className="element-group-detail">
          <label className="detaillabel">API</label>
          <input
            value={rowData.RowData.API}
            disabled
            className="detailinput"
          ></input>
        </div>
        <div className="element-group-detail">
          <label className="detaillabel">Auth</label>
          <input disabled className="detailinput"></input>
        </div>
        <div className="element-group-detail">
          <label className="detaillabel">Category</label>
          <input
            value={rowData.RowData.Category}
            disabled
            className="detailinput"
          ></input>
        </div>
        <div className="element-group-detail">
          <label className="detaillabel">CORS</label>
          <input
            value={rowData.RowData.Cors}
            disabled
            className="detailinput"
          ></input>
        </div>
        <div className="element-group-detail">
          <label className="detaillabel">Description</label>
          <input
            value={rowData.RowData.Description}
            disabled
            className="detailinput"
          ></input>
        </div>
        <div className="element-group-detail">
          <label className="detaillabel">HTTPS</label>
          <input
            value={rowData.RowData.HTTPS.valueOf.toString()}
            disabled
            className="detailinput"
          ></input>
        </div>
        <div className="element-group-detail">
          <label className="detaillabel">Link</label>
          <input
            value={rowData.RowData.Link}
            disabled
            className="detailinput"
          ></input>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailData;
