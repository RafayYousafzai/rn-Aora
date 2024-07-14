import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();

const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then((result) => {
        if (result) {
          setIsLoggedIn(true);
          setUser(result);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        setIsLoggedIn,
        setIsLoading,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider };
export default useGlobalContext;
