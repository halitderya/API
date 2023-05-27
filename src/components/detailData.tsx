import React, { useEffect, useState } from "react";
import { ListData } from "./ListData";
import { RowDataProps, ApiResponse } from "./types";
import "bootstrap/dist/css/bootstrap.css";

const URL: string = "https://api.publicapis.org/entries";
export const DetailData: React.FC<{}> = () => {
  const [detailData, setDetaildata] = useState<RowDataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        setDetaildata(data.entries);

        setLoading(false);
      });
  }, []);
  return (
    <React.Fragment>
      {loading ? <h1>loading</h1> : <ListData RowData={detailData} />}
      <div className="nav right">
        <div className="element-group-detail">
          <label className="detaillabel">{}</label>
          <input disabled className="detailinput"></input>
        </div>
        <div className="element-group-detail">
          <label className="detaillabel">Auth</label>
          <input disabled className="detailinput"></input>
        </div>
        <div className="element-group-detail">
          <label className="detaillabel">Category</label>
          <input disabled className="detailinput"></input>
        </div>
        <div className="element-group-detail">
          <label className="detaillabel">CORS</label>
          <input disabled className="detailinput"></input>
        </div>
        <div className="element-group-detail">
          <label className="detaillabel">Description</label>
          <input disabled className="detailinput"></input>
        </div>
        <div className="element-group-detail">
          <label className="detaillabel">HTTPS</label>
          <input disabled className="detailinput"></input>
        </div>
        <div className="element-group-detail">
          <label className="detaillabel">Link</label>
          <input disabled className="detailinput"></input>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailData;
