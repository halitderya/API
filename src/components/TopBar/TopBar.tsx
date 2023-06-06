import React, { useEffect, useState } from "react";
import { topBarProps } from "../types";
import "../TopBar/TopBar.css";

export const TopBar: React.FC<topBarProps> = ({
  onSearch,
  categoryList,
  onCategoryChange,
  onCorsChange,
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

  const handleCorsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCorsChange(event.target.value);
  };

  return (
    <div className="topbar">
      <fieldset>
        <legend>Filter by Cors :</legend>
        <div className="buttondiv" onChange={handleCorsChange}>
          <input type="radio" id="corsyes" name="corsoption" value="yes" />
          <label htmlFor="corsyes">Yes</label>

          <input type="radio" id="corsno" name="corsoption" value="no" />
          <label htmlFor="corsno">No</label>
        </div>
      </fieldset>
      <div className="searchgroup">
        <select
          defaultValue={"---All---"}
          onChange={handleCategoryChange}
          className="categoryselect"
        >
          {categoryLis!.map((cat) => (
            <option key={cat} value={cat.toString()}>
              {cat.toString()}
            </option>
          ))}
        </select>

        <input
          onChange={handleSearchChange}
          className="searchbar"
          type="text"
          placeholder="Search..."
        ></input>
      </div>
    </div>
  );
};

export default TopBar;
