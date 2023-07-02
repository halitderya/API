import React from "react";
import { RowDataProps, ApiResponse } from "./types";
import "bootstrap/dist/css/bootstrap.css";
export const DetailData: React.FC<{
  RowData: RowDataProps;
  position: string;
}> = ({ RowData, position }) => {
  return (
    <React.Fragment>
      <div className="nav right" style={{ marginTop: `${position}px` }}>
        <div className="element-group-detail">
          <label className="detaillabel">API</label>
          <input value={RowData.API} disabled className="detailinput"></input>
        </div>
        <div className="element-group-detail">
          <label className="detaillabel">Auth</label>
          <input disabled className="detailinput"></input>
        </div>
        <div className="element-group-detail">
          <label className="detaillabel">Category</label>
          <input
            value={RowData.Category}
            disabled
            className="detailinput"
          ></input>
        </div>
        <div className="element-group-detail">
          <label className="detaillabel">CORS</label>
          <input value={RowData.Cors} disabled className="detailinput"></input>
        </div>
        <div className="element-group-detail">
          <label className="detaillabel">Description</label>
          <input
            value={RowData.Description}
            disabled
            className="detailinput"
          ></input>
        </div>
        <div className="element-group-detail">
          <label className="detaillabel">HTTPS</label>
          <input
            value={RowData.HTTPS.valueOf.toString()}
            disabled
            className="detailinput"
          ></input>
        </div>
        <div className="element-group-detail">
          <label className="detaillabel">Link</label>
          <input value={RowData.Link} disabled className="detailinput"></input>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailData;
