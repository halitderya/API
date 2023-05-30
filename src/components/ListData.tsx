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

  let category = function (data: RowDataProps[]): string[] {
    return Array.from(new Set(data.map((obj) => obj.Category)));
  };

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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TopBar onSearch={handleSearchTerm} onCategory={category(listData)} />
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
