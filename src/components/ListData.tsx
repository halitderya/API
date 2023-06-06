import React, { useEffect, useRef, useState } from "react";
import { ApiResponse, RowDataProps } from "./types";
import { RemoveButton, SelectButton } from "../components/button/button";
import DetailData from "./detailData";
import TopBar from "./TopBar/TopBar";
const URL: string = "https://api.publicapis.org/entries";

export const ListData: React.FC<{}> = ({}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [listData, setListdata] = useState<RowDataProps[]>([]);
  const [selectApi, setselectedApi] = useState<RowDataProps>();
  const [filtered, setFiltered] = useState<RowDataProps[]>([]);
  const refselectedcategory = useRef<string>("---All---");
  const refsearchterm = useRef<string>("");
  const refcors = useRef<string>("all");

  const handleCategoryChange = (catselected: string) => {
    refselectedcategory.current = catselected;
    console.log("handleCategoryChange :", refselectedcategory.current);
    masterfilterhandler();
  };

  const handleSearchTerm = (term: string) => {
    refsearchterm.current = term;
    masterfilterhandler();
  };

  const handleCorsChange = (cors: string) => {
    refcors.current = cors;
    masterfilterhandler();
  };

  const masterfilterhandler = () => {
    setFiltered(() => {
      let filteredData = listData;

      if (refselectedcategory.current !== "---All---") {
        filteredData = filteredData.filter((filt) => {
          return filt.Category.indexOf(refselectedcategory.current) !== -1;
        });
      }

      if (refsearchterm.current !== "") {
        filteredData = filteredData.filter((filt) => {
          return (
            filt.API.toLowerCase().indexOf(
              refsearchterm.current.toLowerCase()
            ) !== -1
          );
        });
      }

      if (refcors.current === "yes") {
        filteredData = filteredData.filter((item) => item.Cors === "yes");
      }

      return filteredData;
    });
  };

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

  function selectButtonClicked(api: RowDataProps): void {
    setselectedApi(api);
  }
  function removeButtonClicked(api: RowDataProps): void {
    setFiltered(filtered.filter((listelement) => listelement !== api));
    setselectedApi(undefined);
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
                    onClick={() => selectButtonClicked(listDat)}
                  />
                  <RemoveButton
                    classname="button delete"
                    label="Remove"
                    onClick={() => removeButtonClicked(listDat)}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
          {selectApi ? (
            <DetailData RowData={selectApi} position={"500"} />
          ) : null}
        </div>
      </div>
    </>
  );
};
export default ListData;
