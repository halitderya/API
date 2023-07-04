import React, {
  useEffect,
  useState,
  useMemo
} from "react";
import { ApiResponse, RowDataProps } from "./types";
import { RemoveButton, SelectButton } from "../components/button/button";
import DetailData from "./detailData";
import TopBar from "./TopBar/TopBar";
const URL: string = "https://api.publicapis.org/entries";

export const ListData: React.FC<{}> = ({}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [listData, setListdata] = useState<RowDataProps[]>([]);
  const [selectApi, setselectedApi] = useState<RowDataProps>();
  const [detailDataPosition, setdetailDataPosition] = useState<string>("");

  const [refselectedcategory, setrefselectedcategory] = useState("---All---");
  const [refsearchterm, setrefsearchterm] = useState<string>("");
  const [refcors, setrefcors] = useState<boolean>(false);
  const [deletedIds, setDeletedIds] = useState(new Set());


  const handleCategoryChange = (catselected: string) => {
    console.log({ catselected })
    setrefselectedcategory(catselected);
  };
  const handleSearchTerm = (term: string) => {
    setrefsearchterm(term);
  };

  const handleCorsChange = (cors: boolean) => {
    setrefcors(cors);
  };

  const filtered = useMemo<RowDataProps[]>(() => {
    const result = [];
  
    for (let index = 0; index < listData.length; index++) {
      const element = listData[index];

      const isCategoryValid = refselectedcategory === "---All---" || element.Category.toLowerCase() === refselectedcategory.toLowerCase();
      const isSearchtermValid = refsearchterm === "" || element.API.toLowerCase().indexOf(refsearchterm.toLowerCase()) !== -1;
      const isCorsValid = !refcors || element.Cors === "yes";
      const isDeleted = deletedIds.has(element.id);

      if (isCategoryValid && isSearchtermValid && isCorsValid && !isDeleted) {
        result.push(element);
      }
    }
    return result;
  }, [listData, refcors, refsearchterm, refselectedcategory, deletedIds]);

  const category = function (data: RowDataProps[]): string[] {
    return Array.from(new Set(data.map((obj) => obj.Category)));
  };

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        setListdata(data.entries.map((entry) => ({ ...entry, id: Math.floor(Math.random() * 100000000), })));
        setLoading(false);
      });
  }, []);

  function selectButtonClicked(
    api: RowDataProps,
    e: React.MouseEvent<HTMLButtonElement>
  ): void {
    setselectedApi(api);
    console.log(e.currentTarget as HTMLButtonElement);
    setdetailDataPosition((e.pageY - 180).toString());
  }
  function removeButtonClicked(api: RowDataProps): void {
    const deletedIdsCopy = new Set(Array.from(deletedIds));
    deletedIdsCopy.add(api.id);
    setDeletedIds(deletedIdsCopy);
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
            {filtered.map((listDat) => (
              <React.Fragment key={listDat.id}>
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
                    key={listDat.API}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      selectButtonClicked(listDat, e)
                    }
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
            <DetailData RowData={selectApi} position={detailDataPosition} />
          ) : null}
        </div>
      </div>
    </>
  );
};
export default ListData;
