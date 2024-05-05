import {
  createContext,
  useState,
  useEffect,
} from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("GuestBookUser")) || {username: ""}
  );

  useEffect(() => {
    localStorage.setItem("GuestBookUser", JSON.stringify(currentUser));
  }, [currentUser]);


  return (
    <UserContext.Provider value={{currentUser,setCurrentUser}}>{children}</UserContext.Provider>
  );
};
