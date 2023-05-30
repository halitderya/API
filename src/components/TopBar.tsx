import React, { useEffect, useState } from "react";
import { topBarProps } from "./types";

export const TopBar: React.FC<topBarProps> = ({ onSearch, categoryList }) => {
  const [category, setCategory] = useState<string[]>(categoryList!);

  useEffect(() => {
    setCategory(categoryList!);
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
          {category.map((cat) => (
            <option value={cat.toString()}>{cat.toString()}</option>
          ))}
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
