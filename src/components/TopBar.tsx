import React, { useState } from "react";
import { topBarProps } from "./types";

export const TopBar: React.FC<topBarProps> = ({ onSearch, onCategory }) => {
  const [category, setCategory] = useState<string[]>(onCategory!);

  useEffect(() => {
    setCategory(onCategory!);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
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
