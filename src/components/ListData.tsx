import React, { useState } from "react";
import { RowDataProps } from "./types";
import "bootstrap/dist/css/bootstrap.css";
import { RemoveButton, SelectButton } from "../components/button";
import DetailData from "./detailData";

export const ListData: React.FC<{ RowData: RowDataProps[] }> = ({
  RowData,
}) => {
  const [selectedApi, setSelectedApi] = useState<RowDataProps>();

  function buttonClicked(api: RowDataProps, sender: string): void {
    if (sender == "select") {
      setSelectedApi(api);
      console.log(api);
    } else {
    }
  }
  return (
    <div className="nav left">
      {RowData.map((datar: RowDataProps) => (
        <React.Fragment key={datar.API}>
          <div className="listitem">
            <p>{datar.API + datar.Description}</p>
            <SelectButton
              classname="button select"
              label="Select"
              onClick={() => buttonClicked(datar, "select")}
            />
            <RemoveButton
              classname="button delete"
              label="Remove"
              onClick={() => buttonClicked(datar, "delete")}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
export default ListData;
