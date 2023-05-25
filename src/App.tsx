import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import RowData, { RowDataProps } from "./components/RowData";


const App: React.FC = () => {

const [selectedApi,setSelectedApi] =useState<RowDataProps |null>(null);

  const handleApiSelect= (api:RowDataProps) => {

    setSelectedApi(api)
  }
 return (

<>
<RowData onSelectApi={handleApiSelect} />
</>



  );

};

export default App;
