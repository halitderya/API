import React, { useEffect, useState } from "react";
import { ApiResponse, RowDataProps } from "./types";
import { RemoveButton, SelectButton } from "../components/button/button";
import DetailData from "./detailData";
import TopBar from "./TopBar";
const URL: string = "https://api.publicapis.org/entries";

export const ListData: React.FC<{}> = ({}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [listData, setListdata] = useState<RowDataProps[]>([]);
  const [selectApi, setselectedApi] = useState<RowDataProps>();
  const [filtered, setFiltered] = useState<RowDataProps[]>([]);
  let selectedcategory: string = "";
  let searchterm: string = "";

  const handleCategoryChange = (catselected: string) => {
    selectedcategory = catselected;
    masterfilterhandler(catselected, searchterm);
  };

  const handleSearchTerm = (term: string) => {
    searchterm = term;
    masterfilterhandler(selectedcategory, term);
  };

  const masterfilterhandler = (
    selectedcategory: string,
    searchterm?: string
  ) => {
    if (selectedcategory == "---All---" && searchterm == "") {
      setFiltered(listData); // initial state
      console.log(
        "1 category selected: ",
        selectedcategory,
        "searchterm not entered: ",
        searchterm
      );
      selectedcategory = "";
    } else if (selectedcategory !== "---All---" && searchterm == "") {
      console.log(
        "2 category selected: ",
        selectedcategory,
        "searchterm not entered: ",
        searchterm
      );
      setFiltered(
        listData.filter((listd) => {
          return listd.Category.indexOf(selectedcategory!) !== -1;
        })
      );
      console.log("filtered :", filtered);
    } else if (selectedcategory !== "---All---" && searchterm !== "") {
      console.log(
        "3 CATEGORY ",
        selectedcategory,
        " SELECTED SEARCH ",
        searchterm,
        " ENTERED"
      );
      let temp = listData.filter((listd) => {
        return listd.Category.indexOf(selectedcategory!) !== -1;
      });

      setFiltered(
        temp.filter((filt) => {
          return (
            filt.API.toLowerCase().indexOf(searchterm!.toLowerCase()) !== -1
          );
        })
      );
    }
  };

  ////////////search ended

  let category = function (data: RowDataProps[]): string[] {
    return Array.from(new Set(data.map((obj) => obj.Category)));
  };

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        setListdata(data.entries);
        setFiltered(data.entries);
        setLoading(false);
      });
  }, []);

  function buttonClicked(api: RowDataProps, sender: string): void {
    if (sender == "select") {
      setselectedApi(api);
    } else if (sender == "delete") {
      let newvalues = listData.filter((listelement) => listelement !== api);
      setListdata(newvalues);
      setselectedApi(undefined);
    }
  }
  return (
    <>
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TopBar
            onSearch={handleSearchTerm}
            categoryList={category(listData)}
            onCategoryChange={handleCategoryChange}
          />
        )}

        <div className={` ${!loading ? "content" : ""} `}>
          <div className="nav left">
            {/*           {listData.map((listDat: RowDataProps) => (
             */}

            {filtered.map((listDat: RowDataProps) => (
              <React.Fragment key={listDat.API + listDat.Description}>
                <div className="listitem">
                  <p>
                    {"Name: " +
                      listDat.API +
                      " | " +
                      "  Category:" +
                      listDat.Category}
                  </p>
                  <SelectButton
                    classname="button select"
                    label="Select"
                    onClick={() => buttonClicked(listDat, "select")}
                  />
                  <RemoveButton
                    classname="button delete"
                    label="Remove"
                    onClick={() => buttonClicked(listDat, "delete")}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
          {selectApi ? (
            <DetailData RowData={selectApi} positionY={"500"} />
          ) : null}
        </div>
      </div>
    </>
  );
};
export default ListData;
