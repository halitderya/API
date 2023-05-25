import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { type } from "os";

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

interface ApiListProps {
  onSelectApi: (api: RowDataProps, id: number) => void;
}

const URL: string = "https://api.publicapis.org/entries";
export const RowData: React.FC<ApiListProps> = ({onSelectApi}) => {


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
    <li key={datas.API}>Name: {datas.Description} Category: {datas.Category}  </li>
    
  </>
    ))}
</ul>
)



}


</>


  );
};

export default RowData;
