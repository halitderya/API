import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { type } from "os";

type RowDataProps = {
  count: number;
  entries: {
    API: string;
    Description: string;
    Auth: string;
    HTTPS: boolean;
    Cors: string;
    Link: string;
    Category: string;
  };
};

const RowData: React.FC<RowDataProps> = (props: RowDataProps) => {
  return (
    <tr>
      <td scope="col">{props.entries.API}</td>
      <td scope="col">{props.entries.Auth}</td>
      <td scope="col">{props.entries.Category}</td>
      <td scope="col">{props.entries.Description}</td>
      <td scope="col">{props.entries.HTTPS}</td>
      <td scope="col">{props.entries.Link}</td>
      <td>
        <button className="btn btn-danger"> Delete</button>
      </td>
    </tr>
  );
};

export default RowData;
