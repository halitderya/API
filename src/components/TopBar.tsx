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
    switch (event.target.value) {
      case "all":
        onCorsChange("all");
        break;
      case "yes":
        onCorsChange("yes");

        break;
      case "unknown":
        onCorsChange("unknown");

        break;
    }
  };

  return (
    <div className="topbar">
      <fieldset>
        <legend>Cors:</legend>
        <div onChange={handleCorsChange}>
          <input type="radio" id="corsyes" name="corsoption" value="yes" />
          <label htmlFor="corsyes">Yes</label>

          <input
            type="radio"
            id="corsunknown"
            name="corsoption"
            value="unknown"
          />
          <label htmlFor="corsunknown">No</label>

          <input type="radio" id="corsall" name="corsoption" value="all" />
          <label htmlFor="corsall">All</label>
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
          className="searchbar"
          type="text"
          placeholder="Search..."
        ></input>
      </div>
    </div>
  );
};

export default TopBar;
