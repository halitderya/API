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
  const [searchterm, setsearchterm] = useState<string>("");

  let selectedcategory: string = "";

  const handleSearchTerm = (term: string) => {
    setsearchterm(term);
    /*  
    setFiltered(
      listData.filter((filt) => {
        return filt.API.toLowerCase().indexOf(term.toLowerCase()) !== -1;
      })
    ); */
  };

  //const masterfilterhandler = () => {};

  const handleCategoryChange = (newcategory: string) => {
    console.log("newcategory: ", newcategory, "searchterm: ", searchterm);

    if (newcategory == "---All---" && searchterm == "") {
      setFiltered(listData); // initial state
    } else if (newcategory !== "---All---" && searchterm == "") {
      selectedcategory = newcategory;
      console.log("CATEGORY SELECTED NO SEARCH TERM");

      setFiltered(
        listData.filter((listd) => {
          return listd.Category.indexOf(selectedcategory) !== -1;
        })
      );
    } else if (newcategory !== "---All---" && searchterm !== "") {
      console.log("CATEGORY SELECTED SEARCH ENTERED");
      let temp = listData.filter((listd) => {
        return listd.Category.indexOf(newcategory) !== -1;
      });

      console.log("temp  :", temp);

      setFiltered(
        temp.filter((filt) => {
          return (
            filt.API.toLowerCase().indexOf(searchterm.toLowerCase()) !== -1
          );
        })
      );
      console.log("filtered  :", filtered);
    }
  };

  let category = function (data: RowDataProps[]): string[] {
    return Array.from(new Set(data.map((obj) => obj.Category)));
  };

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        setListdata(data.entries);
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

            {(filtered.length > 0 ? filtered : listData)?.map(
              (listDat: RowDataProps) => (
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
              )
            )}
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
