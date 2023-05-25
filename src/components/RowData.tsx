import React, { useEffect, useState } from "react";
import { ListData } from './ListData';
import { RowDataProps } from './types';
import "bootstrap/dist/css/bootstrap.css";
interface ApiResponse {
  count: number;
  entries: RowDataProps[];
}

const URL: string = "https://api.publicapis.org/entries";
export const RowData: React.FC<{}> = () => {

  const [RowData, SetRowData] = useState<RowDataProps[]>([]);
  const [loading, setLoading]= useState<boolean>(true);

  useEffect(() => {

    fetch(URL)
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        SetRowData(data.entries);
        setLoading(false);
      })
  },[]);

  return loading
    ? <p>Loading...</p>
    : <ul>
        <ListData RowData={RowData} />
      </ul>;
};

export default RowData;
