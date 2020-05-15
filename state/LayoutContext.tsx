import React, { useState, useContext } from "react";

export const LayoutContext = React.createContext(null);

export const LayoutProvider = ({ children }) => {
  const [layoutState, setLayoutState] = useState({
    site: "index",
  });

  return (
    <LayoutContext.Provider value={{ layoutState, setLayoutState }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutState = () => useContext(LayoutContext);

export default LayoutContext;
