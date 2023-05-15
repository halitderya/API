import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { table } from "console";
import { useEffect } from "react";
import RowData from "./components/RowData";

const URL: string = "https://api.publicapis.org/entries";

type Entry = {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  Category: string;
}

type RowDataProps = {
  count: number;
  entries: Entry[];
};

const App: React.FC = () => {
  const [RowData, SetRowData] = useState<RowDataProps>();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get<RowDataProps>(URL);
      SetRowData(response.data);
      console.log(response.data);
    };
    getData();
  }, []);

  return (
    <>
        {RowData?.entries.map((entry) => {
        return <h1>{entry.API}</h1>;
      })}

      {/*  <div className="App">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <input placeholder="Search"></input>
              </th>
              <th scope="col"></th>
            </tr>
            <tr>
              <th scope="col">API</th>
              <th scope="col">Description</th>
              <th scope="col">Auth</th>
              <th scope="col">Cors</th>
              <th scope="col">Link</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tr></tr>
        </table>
        <h1>
          <>{RowData?.map}</>
        </h1>
      </div> */}
    </>
  );
};

export default App;
