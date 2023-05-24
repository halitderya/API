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
  Category: string;
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
SetRowData(data.entries);
setLoading(false);

})

},[]);

  return (

<>
{loading && <p>Loading...</p>}

{!loading &&

(
  
<ul>
  
  {RowData.map((datas:RowDataProps) =>(
<>
    <li key={datas.API}>Name: {datas.Description}      |      Category: {datas.Category}  </li>
    
  </>
    ))}
</ul>
)



}


</>



  );

};

export default App;
