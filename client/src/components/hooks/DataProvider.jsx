import { useState, createContext, useContext, useMemo } from "react";

const DataContext = createContext({});

const DataProvider = ({ children }) => {
  const [userLinks, setUserLinks] = useState([]);

  console.log(userLinks, 'userLinks from data context');

  const setLinks = async (links) => setUserLinks(links);

  const value = useMemo(
    () => ({
      userLinks,
      setLinks,
    }),
    [userLinks],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

const useDataContext = () => {
  return useContext(DataContext);
}

export { useDataContext, DataProvider };