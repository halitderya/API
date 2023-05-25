import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { type } from "os";

interface ButtonProps {
  onClick: () => void;
  label: string;
}
interface ApiResponse {
  count: number;
  entries: RowDataProps[];
}

export interface RowDataProps {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  Category: string;
}

interface ApiListProps {
  onSelectApi: (api: RowDataProps) => void;
}

const URL: string = "https://api.publicapis.org/entries";
export const RowData: React.FC<ApiListProps> = ({onSelectApi}) => {

  const [RowData, SetRowData] = useState<RowDataProps[]>([]);
  const [loading, setLoading]= useState<boolean>(true);
  const [selectedApi, setSelectedApi]= useState<RowDataProps>();
  useEffect(() => {

    fetch(URL)
    .then((response) => response.json())
    .then((data: ApiResponse) =>{
    SetRowData(data.entries);
    setLoading(false);
    
    })},[]);
    
  function buttonClicked(api:RowDataProps): void {
    onSelectApi(api)
    console.log(api)
    setSelectedApi(api)
  }

  return (
   
    <>
{loading && <p>Loading...</p>}

{!loading &&

(
  
<ul>
  
  {RowData.map((datar:RowDataProps) =>(
<>
<div className="flex-container">
<div className="flex-child">
<li key={datar.API}>Name: {datar.Description} Category: {datar.Category}  <button onClick={()=> buttonClicked(datar)}>Select</button></li>

</div>
    <div className="flex-child">

<a>{selectedApi?.API}</a>
    </div>
    </div>
  </>
    ))}
</ul>
)
}
</>


  );
};

export default RowData;
