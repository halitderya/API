import React, { useState } from "react";
import { RowDataProps } from './types';
import "bootstrap/dist/css/bootstrap.css";

export const ListData: React.FC<{ RowData: RowDataProps[] }> = ({ RowData }) => {
  const [selectedApi,setSelectedApi] =useState<RowDataProps |null>(null);
  function buttonClicked(api:RowDataProps): void {
    console.log(api)
    setSelectedApi(api)
  }
  return (
    <>
      {RowData.map((datar:RowDataProps) =>(
        <React.Fragment key={datar.API}>
          <div className="flex-container">
            <div className="flex-child">
              <li key={datar.API}>Name: {datar.Description} Category: {datar.Category} <button onClick={()=> buttonClicked(datar)}>Select</button></li>
            </div>
            <div className="flex-child">
              <span>{selectedApi?.API}</span>
            </div>
          </div>
        </React.Fragment>
      ))}
    </>
  )
}
