import { useState, useCallback, useEffect, createRef } from "react";
import { Box, SearchField, IconButton } from "gestalt";
import SearchFilters from "./search-filters";
import useQuery from "../hooks/useQuery";

const url = "https://www.example.com";

const Search = () => {
  const [value, setValue] = useState("");
  const [isPanelShown, setIsPanelShown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({});
  const { loading, data } = useQuery();
  const searchRef = createRef(null);

  const prepareUrl = (selectedFilter, value) => {
    const getSeperator = (idx) => (idx === 0 ? "?" : "&");
    const queryObject = {};
    if (value) {
      queryObject.searchText = value;
    }
    const filters = Object.keys(selectedFilter);

    filters.forEach((filter) => {
      if (
        Object.prototype.toString.call(selectedFilter[filter]) ===
        "[object Object]"
      ) {
        const keys = Object.keys(selectedFilter[filter]);
        if (keys.length > 0) {
          const filteredKeys = keys.filter((key) => key === true);
          if (filteredKeys.length > 0)
            queryObject[filter] = filteredKeys.join("+");
        }
      } else {
        queryObject[filter] = selectedFilter[filter];
      }
    });

    const queryKeys = Object.keys(queryObject);
    let queryString = "";
    if (queryKeys.length) {
      queryKeys.forEach(
        (key, idx) =>
          (queryString = `${queryString}${getSeperator(idx)}${key}=${
            queryObject[key]
          }`)
      );
    }

    return `${url}${queryString}`;
  };

  useEffect(() => {
    const { current: domEl } = searchRef;

    const keyUpHandler = (e) => {
      const keyCode = e.which || e.keyCode;
      if (keyCode === 13) {
        const queryUrl = prepareUrl(selectedFilter, value);
        console.log("query url : ", queryUrl);
      }
    };

    searchRef.current.addEventListener("keyup", keyUpHandler);

    return () => {
      domEl.removeEventListener("keyup", keyUpHandler);
    };
  }, [selectedFilter, value]);

  const modifySelectedFilter = (name, key) => {
    setSelectedFilter({
      ...selectedFilter,
      [name]: key,
    });
  };

  const memoizedSetSelectedFilter = useCallback(modifySelectedFilter, [
    selectedFilter,
  ]);

  return (
    <>
      <Box display="flex" direction="row" alignItems="center">
        <Box flex="grow">
          <SearchField
            id="search"
            onChange={({ value }) => setValue(value)}
            value={value}
            accessibilityLabel="Search term"
            placeholder="Search"
            ref={searchRef}
          />
        </Box>
        <Box marginLeft={2}>
          <IconButton
            icon="arrow-down"
            accessibilityLabel="Show filters"
            onClick={() => setIsPanelShown((shown) => !shown)}
          />
        </Box>
      </Box>
      {isPanelShown && (
        <SearchFilters
          filterData={data}
          setSelectedFilters={memoizedSetSelectedFilter}
        />
      )}
    </>
  );
};

export default Search;
