import React, { useEffect, useRef, useState } from "react";
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
  const refselectedcategory = useRef<string>("");
  const refsearchterm = useRef<string>("");
  const refcors = useRef<boolean>(true);

  const handleCategoryChange = (catselected: string) => {
    console.log(
      "category changed new log",
      catselected,
      "search: ",
      refsearchterm
    );
    refselectedcategory.current = catselected;
    masterfilterhandler();
  };

  const handleSearchTerm = (term: string) => {
    console.log("handleworked");
    console.log(filtered);
    refsearchterm.current = term;
    masterfilterhandler();
  };

  const handleCorsChange = (cors: boolean) => {
    refcors.current = !refcors.current;
    console.log("refcors :", refcors.current);
    masterfilterhandler();
  };

  const masterfilterhandler = () => {
    if (refcors.current == true) {
      setFiltered(
        listData.filter((listd) => {
          return listData.filter(
            (item) => !item.hasOwnProperty("Yes") || item.Cors
          );
        })
      );
    } else {
    }
    if (
      refselectedcategory.current == "---All---" &&
      refsearchterm.current == ""
    ) {
      setFiltered(listData);
      ///////// category not selected - search not entered
      console.log(
        "1 category-all selected: ",
        refselectedcategory,
        "searchterm not entered: ",
        refsearchterm
      );
      //////////////
    } else if (
      refselectedcategory.current !== "---All---" &&
      refsearchterm.current == ""
    ) {
      //////// category selected- search not entered

      console.log(
        "2 category selected: ",
        refselectedcategory,
        "searchterm not entered: ",
        refsearchterm
      );
      ////////////
      setFiltered(
        listData.filter((listd) => {
          return listd.Category.indexOf(refselectedcategory.current) !== -1;
        })
      );
      console.log("filtered :", filtered);
    } else if (
      refselectedcategory.current !== "---All---" &&
      refsearchterm.current !== ""
    ) {
      //////// category selected- search entered
      console.log(
        "3 CATEGORY ",
        refselectedcategory,
        " SELECTED SEARCH ",
        refsearchterm,
        " ENTERED"
      );
      ////////
      let temp = listData.filter((listd) => {
        return listd.Category.indexOf(refselectedcategory.current) !== -1;
      });

      setFiltered(
        temp.filter((filt) => {
          return (
            filt.API.toLowerCase().indexOf(
              refsearchterm.current.toLowerCase()
            ) !== -1
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
        refselectedcategory.current = "---All---";
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
            onCorsChange={handleCorsChange}
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
