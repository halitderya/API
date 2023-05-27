import React, {
  DetailedHTMLProps,
  HtmlHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { ApiResponse, RowDataProps } from "./types";
import "bootstrap/dist/css/bootstrap.css";
import { RemoveButton, SelectButton } from "../components/button";
import DetailData from "./detailData";
const URL: string = "https://api.publicapis.org/entries";

export const ListData: React.FC<{}> = ({}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [listData, setListdata] = useState<RowDataProps[]>([]);
  const [selectApi, setselectedApi] = useState<RowDataProps>();

  function filterout(api: RowDataProps, argument: string) {
    if (argument == "delete") {
      return api;
    } else {
      return listData;
    }
  }

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
      const newvalues = listData.filter((listelement) => listelement !== api);
      setListdata(newvalues);
      console.log(api);
      setselectedApi(undefined);
    }
  }
  return (
    <>
      <div className="nav left">
        {listData.map((listDat: RowDataProps) => (
          <React.Fragment key={listDat.API}>
            <div className="listitem">
              <p>
                {"Name: " +
                  listDat.API +
                  " " +
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
      {selectApi ? <DetailData RowData={selectApi} positionY={"500"} /> : null}
    </>
  );
};
export default ListData;
