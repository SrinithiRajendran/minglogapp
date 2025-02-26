import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const FilterContext = createContext();

// eslint-disable-next-line react/prop-types
export const FilterProvider = ({ children }) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [filterDate, setFilterDate] = useState("");
  return (
    <FilterContext.Provider
      value={{
        searchTitle,
        setSearchTitle,
        setSelectedState,
        selectedState,
        filterDate,
        setFilterDate,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
