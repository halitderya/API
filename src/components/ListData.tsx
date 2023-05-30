import React, { useEffect, useState } from "react";
import { ApiResponse, RowDataProps } from "./types";
import { RemoveButton, SelectButton } from "../components/button/button";
import DetailData from "./detailData";
import TopBar from "./TopBar";
const URL: string = "https://api.publicapis.org/entries";

export const ListData: React.FC<{}> = ({}) => {
  const [loading, setLoading] = useState<boolean>(true);
  let [listData, setListdata] = useState<RowDataProps[]>([]);
  const [selectApi, setselectedApi] = useState<RowDataProps>();
  let [filtered, setFiltered] = useState<RowDataProps[]>([]);

  /*   function filterout(api: RowDataProps, argument: string) {
    if (argument == "delete") {
      return api;
    } else {
      return listData;
    }
  } */

  const handleSearchTerm = (term: string) => {
    setFiltered(
      listData.filter((listd) => {
        return listd.API.toLowerCase().indexOf(term.toLowerCase()) !== -1;
      })
    );

    console.log("searchterm: ", term, "filtered  :", filtered);
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
        {loading ? <p>Loading...</p> : <TopBar onSearch={handleSearchTerm} />}

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
