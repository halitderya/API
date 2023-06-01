import React, { useEffect, useState } from "react";
import { topBarProps } from "./types";

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
    event.target.value == "Yes" ? onCorsChange(true) : onCorsChange(false);
  };

  return (
    <div className="topbar">
      <fieldset>
        <legend>Cors:</legend>
        <div onChange={handleCorsChange}>
          <input type="radio" id="corstrue" name="corsoption" value="true" />
          <label htmlFor="corstrue">Yes</label>

          <input type="radio" id="corsfalse" name="corsoption" value="false" />
          <label htmlFor="corsfalse">No</label>
        </div>
      </fieldset>
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
