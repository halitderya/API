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
  useEffect(() => {}, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  function debounce(func: Function, delay: number) {
    let timeoutID: any = null;
    return function (...args: any) {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedHandleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleSearchChange(event);
    },
    500
  );

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onCategoryChange(event.target.value);
  };

  const handleCorsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCorsChange(event.target.checked);
  };

  return (
    <div className="topbar">
      <fieldset>
        <legend>Filter by Cors :</legend>
        <div className="buttondiv" onChange={handleCorsChange}>
          <input type="checkbox" id="corsyes" name="corsoption" value="true" />
          <label htmlFor="corsyes">Yes</label>
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
          onChange={debouncedHandleSearch}
          className="searchbar"
          type="text"
          placeholder="Search..."
        ></input>
      </div>
    </div>
  );
};

export default TopBar;
