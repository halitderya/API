import React, { useState } from "react";
import { topBarProps } from "./types";

export const TopBar: React.FC<topBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };
  return (
    <div className="topbar">
      <div className="radiogroup">
        <div className="radioitem">
          <label htmlFor="radiocors"> CORS</label>
          <input name="radiocors" type="radio"></input>
        </div>
        <div className="radioitem">
          <label htmlFor="radiocors"> CORS</label>
          <input name="radiocors" type="radio"></input>
        </div>
        <div className="radioitem">
          <label htmlFor="radiocors"> CORS</label>
          <input name="radiocors" type="radio"></input>
        </div>
        <div className="radioitem">
          <label htmlFor="radiocors"> CORS</label>
          <input name="radiocors" type="radio"></input>
        </div>
        <div></div>
      </div>
      <div className="searchgroup">
        <select className="categoryselect">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>

        <input
          onChange={handleSearchChange}
          // value={searchTerm}
          className="searchbar"
          type="text"
          placeholder="Search..."
        ></input>
      </div>
    </div>
  );
};

export default TopBar;
