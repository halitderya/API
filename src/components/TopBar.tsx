import React, { useEffect, useState } from "react";
import { topBarProps } from "./types";

export const TopBar: React.FC<topBarProps> = ({
  onSearch,
  categoryList,
  onCategoryChange,
}) => {
  const [category, setCategory] = useState<string[]>(categoryList!);

  useEffect(() => {
    //since react is in strict mode, useeffects works twice.

    if (categoryList?.indexOf("---All---") === -1)
      categoryList.unshift("---All---");

    setCategory(categoryList!);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onCategoryChange(event.target.value);
  };
  return (
    <div className="topbar">
      <label>Filter By CORS</label>
      <div className="radiogroup">
        <br />
        <div className="radioitem">
          <label htmlFor="radiocors"> Yes</label>
          <input name="radiocors" type="radio"></input>
        </div>
        <div className="radioitem">
          <label htmlFor="radiocors"> No</label>
          <input name="radiocors" type="radio"></input>
        </div>

        <div></div>
      </div>
      <div className="searchgroup">
        <select onChange={handleCategoryChange} className="categoryselect">
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
