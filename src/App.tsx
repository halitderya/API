import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { table } from "console";
import { useEffect } from "react";
import RowData from "./components/RowData";

const URL: string = "https://api.publicapis.org/entries";

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

const App: React.FC = () => {
  const [StRowData, SetRowData] = useState<RowDataProps[]>();

  const getdata = () => {
    axios.get<RowDataProps[]>(URL).then((response) => {
      console.log(response.data);
      SetRowData(response.data);
      console.log(StRowData);
    });
  };

  useEffect(() => {
    getdata();
  }, [SetRowData]);

  return (
    <>
      <div className="App">
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
          {<RowData count={StRowData} entries={StRowData?.entries} />}{" "}
        </table>
      </div>
    </>
  );
};

export default App;
