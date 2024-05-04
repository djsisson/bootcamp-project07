import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("GuestBookUser")) || {username:""}
  );

  useEffect(() => {
    localStorage.setItem("GuestBookUser", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = useCallback((response) => {
    storeCredentials(response.credentials);
    setCurrentUser(response.user);
  }, []);

  const contextValue = useMemo(
    () => ({
      currentUser,
      login,
    }),
    [currentUser, login]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
