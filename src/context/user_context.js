import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState(null);


  return (
    <UserContext.Provider value={{ myUser, setMyUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
