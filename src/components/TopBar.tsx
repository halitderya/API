import React, { useEffect, useState } from "react";
import { topBarProps } from "./types";

export const TopBar: React.FC<topBarProps> = ({
  onSearch,
  categoryList,
  onCategoryChange,
}) => {
  // const [category, setCategory] = useState<string[]>(categoryList!);

  let categoryLis = categoryList;
  if (categoryLis!.indexOf("---All---") === -1)
    categoryLis!.unshift("---All---");

  useEffect(() => {
    //since react is in strict mode, useeffects works twice.
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
        <select
          defaultValue={"---All---"}
          onChange={handleCategoryChange}
          className="categoryselect"
        >
          {categoryLis!.map((cat) => (
            <option value={cat.toString()}>{cat.toString()}</option>
          ))}
        </select>

        <input
          onChange={handleSearchChange}
          //  value={onSearch.toString()}
          className="searchbar"
          type="text"
          placeholder="Search..."
        ></input>
      </div>
    </div>
  );
};

export default TopBar;
