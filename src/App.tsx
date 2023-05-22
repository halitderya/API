import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import RowData from "./components/RowData";

const URL: string = "https://api.publicapis.org/entries";

export interface RowDataProps {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  category: string;
}

interface ApiResponse {
  count: number;
  entries: RowDataProps[];
}

const App: React.FC = () => {

  const [RowData, SetRowData] = useState<RowDataProps[]>([]);
  const [count, setCount]= useState<number>(0);
  const [loading, setLoading]= useState<boolean>(true);


  useEffect(() => {


fetch(URL)
.then((response) => response.json())
.then((data: ApiResponse) =>{
console.log(data.entries);
SetRowData(data.entries);
setLoading(false);

})

  console.log(RowData)
},[]);

  return (

  
<>


{console.log('last :',RowData)};

</>



    
  );

};

export default App;
